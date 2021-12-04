import {
	DarkTheme,
	DefaultTheme,
	NavigationContainer,
} from "@react-navigation/native";
import type { VFC } from "react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { ColorSchemeName } from "react-native";
import { getSequreStore } from "src/functions";
import { AuthNavigator } from "src/navigations/AuthNavigator";
import { LinkingConfiguration } from "src/navigations/LinkingConfiguration";
import { RootNavigator } from "src/navigations/RootNavigator";

export const Navigations: VFC<{ colorScheme: ColorSchemeName }> = (props) => {
	const [isSignin, setIsSignin] = useState({
		isLoading: true,
		token: "",
	});

	const themeResult = useMemo(() => {
		return props?.colorScheme === "dark" ? DarkTheme : DefaultTheme;
	}, [props]);

	const listenAuthState = useCallback(async () => {
		const result = await getSequreStore("token");
		if (result) {
			setIsSignin({
				isLoading: false,
				token: result,
			});
		} else {
			setIsSignin((prev) => ({
				...prev,
				isLoading: false,
			}));
		}
	}, []);

	useEffect(() => {
		listenAuthState();
	}, []);

	return (
		<NavigationContainer linking={LinkingConfiguration} theme={themeResult}>
			{isSignin.isLoading ? null : isSignin.token ? (
				<RootNavigator />
			) : (
				<AuthNavigator />
			)}
		</NavigationContainer>
	);
};
