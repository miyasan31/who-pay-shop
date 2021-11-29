/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import type { VFC } from "react";
import React from "react";
import type { ColorSchemeName } from "react-native";
import { LinkingConfiguration } from "src/navigations/LinkingConfiguration";
import { RootNavigator } from "src/navigations/RootNavigator";

export const Navigation: VFC<{ colorScheme: ColorSchemeName }> = (props) => {
	return (
		<NavigationContainer
			linking={LinkingConfiguration}
			theme={props?.colorScheme === "dark" ? DarkTheme : DefaultTheme}
		>
			<RootNavigator />
		</NavigationContainer>
	);
};
