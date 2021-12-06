import type { ReactNode, VFC } from "react";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { user } from "src/atom";
import { getSequreStore } from "src/functions/store";
import { AuthNavigator } from "src/navigations/AuthNavigator";

type Props = {
	children: ReactNode;
};

export const AuthProvider: VFC<Props> = (props) => {
	const [isLoading, seIsLoading] = useState(true);
	const [userInfo, setUserInfo] = useRecoilState(user);

	const listenAuthState = useCallback(async () => {
		const result = await getSequreStore("access-token");
		if (result) {
			setUserInfo((prev) => ({ ...prev, isSignin: true }));
		} else {
			console.error("error");
		}
		seIsLoading(false);
	}, []);

	useEffect(() => {
		listenAuthState();
	}, []);

	if (isLoading) {
		return null;
	} else {
		return <>{userInfo.isSignin ? <>{props.children}</> : <AuthNavigator />}</>;
	}
};
