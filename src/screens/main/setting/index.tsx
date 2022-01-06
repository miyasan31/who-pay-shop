import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { VFC } from "react";
import React from "react";
import { HeaderButton } from "src/components";
import type {
	MainScreenProps,
	SettingScreenProps,
	SettingStackParamList,
} from "types";

import { SettingSelectScreen } from "./SettingSelectScreen";

type Option = MainScreenProps<"Setting"> | SettingScreenProps<"SettingSelect">;

const SettingStack = createNativeStackNavigator<SettingStackParamList>();

export const SettingNavigator: VFC = () => {
	return (
		<SettingStack.Navigator initialRouteName="SettingSelect" screenOptions={{}}>
			<SettingStack.Screen
				name="SettingSelect"
				component={SettingSelectScreen}
				options={(option: Option) => ({
					title: "Who Pay",
					headerRight: () => <HeaderButton {...option} screen="Pay" />,
				})}
			/>
		</SettingStack.Navigator>
	);
};
