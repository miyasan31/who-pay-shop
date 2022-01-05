import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { VFC } from "react";
import React from "react";
import type { SettingStackParamList } from "types";

import { SettingSelectScreen } from "./SettingSelectScreen";

const SettingStack = createNativeStackNavigator<SettingStackParamList>();

export const SettingNavigator: VFC = () => {
	return (
		<SettingStack.Navigator
			initialRouteName="SettingSelect"
			screenOptions={{
				title: "Who Pay",
				headerBackTitle: "戻る",
			}}
		>
			<SettingStack.Screen
				name="SettingSelect"
				component={SettingSelectScreen}
				options={() => ({})}
			/>
		</SettingStack.Navigator>
	);
};
