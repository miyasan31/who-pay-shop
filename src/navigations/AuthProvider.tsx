import type { ReactNode, VFC } from "react";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast/src/core/toast";
import { useRecoilState } from "recoil";
import { shop } from "src/atom";
import { Progress } from "src/components";
import { requestFetcher } from "src/functions/fetcher";
import { getSequreStore, saveSequreStore } from "src/functions/store";
import { AuthNavigator } from "src/screens/auth";
import type { Shop } from "types/fetcher";

type Props = {
	children: ReactNode;
};

export const AuthProvider: VFC<Props> = (props) => {
	const [isLoading, seIsLoading] = useState(true);
	const [shopInfo, setShopInfo] = useRecoilState(shop);

	const listenAuthState = useCallback(async () => {
		const tokenResult = await getSequreStore("access_token");
		if (tokenResult) {
			const requestBody = { token: tokenResult };
			const { statusCode, response } = await requestFetcher<Shop>(
				"/auth/session/shop",
				requestBody,
				"POST"
			);

			if (statusCode >= 400) {
				toast("エラーが発生しました", {
					icon: "🤦‍♂️",
				});
				return;
			}

			await saveSequreStore("access_token", response.token);
			await setShopInfo({
				id: response.id,
				shopName: response.shopName,
				address: response.address,
				email: response.email,
				phone: response.phone,
				token: response.token,
				isSignin: true,
			});
		}
		await new Promise((resolve) => setTimeout(resolve, 500));
		seIsLoading(false);
	}, []);

	const loadingFalse = useCallback(async () => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		seIsLoading(false);
	}, []);

	useEffect(() => {
		if (!isLoading) seIsLoading(true);
		if (!shopInfo.isSignin) {
			listenAuthState();
		} else {
			loadingFalse();
		}
	}, [shopInfo.isSignin]);

	if (isLoading) {
		return <Progress />;
	} else {
		return <>{shopInfo.isSignin ? <>{props.children}</> : <AuthNavigator />}</>;
	}
};
