import {
	DarkTheme,
	DefaultTheme,
	NavigationContainer,
} from "@react-navigation/native";
import type { VFC } from "react";
import React, { useMemo } from "react";
import type { ColorSchemeName } from "react-native";
import { LinkingConfiguration } from "src/navigations/LinkingConfiguration";
import { RootNavigator } from "src/navigations/RootNavigator";

export const Navigation: VFC<{ colorScheme: ColorSchemeName }> = (props) => {
	const themeResult = useMemo(() => {
		return props?.colorScheme === "dark" ? DarkTheme : DefaultTheme;
	}, [props]);

	return (
		<NavigationContainer linking={LinkingConfiguration} theme={themeResult}>
			<RootNavigator />
		</NavigationContainer>
	);
};
