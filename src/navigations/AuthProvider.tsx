import type { ReactNode, VFC } from "react";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { shop } from "src/atom";
import { getSequreStore } from "src/functions/store";
import { AuthNavigator } from "src/navigations/AuthNavigator";

type Props = {
	children: ReactNode;
};

export const AuthProvider: VFC<Props> = (props) => {
	const [isLoading, seIsLoading] = useState(true);
	const [shopInfo, setShopInfo] = useRecoilState(shop);

	const listenAuthState = useCallback(async () => {
		const result = await getSequreStore("access-token");
		if (result) {
			setShopInfo((prev) => ({ ...prev, isSignin: true }));
		} else {
			console.info("error");
		}
		seIsLoading(false);
	}, []);

	useEffect(() => {
		listenAuthState();
	}, []);

	if (isLoading) {
		return null;
	} else {
		return <>{shopInfo.isSignin ? <>{props.children}</> : <AuthNavigator />}</>;
	}
};
