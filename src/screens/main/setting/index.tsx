import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { VFC } from "react";
import React from "react";
import { HeaderButton, PrevButton } from "src/components";
import { AccountNavigator } from "src/screens/main/setting/account";
import { PaymentNavigator } from "src/screens/main/setting/payment";
import type { SettingScreenProps, SettingStackParamList } from "types";

import { SettingSelectScreen } from "./SettingSelectScreen";

type Option = SettingScreenProps<"SettingSelect" | "Payment">;

const Setting = createNativeStackNavigator<SettingStackParamList>();

export const SettingNavigator: VFC = () => {
	return (
		<Setting.Navigator initialRouteName="SettingSelect" screenOptions={{}}>
			<Setting.Screen
				name="SettingSelect"
				component={SettingSelectScreen}
				options={(option: Option) => ({
					title: "設定",
					headerRight: () => (
						<HeaderButton {...option} screen="Pay" name="close" />
					),
				})}
			/>
			<Setting.Screen
				name="AccountSetting"
				component={AccountNavigator}
				options={() => ({
					title: "アカウント",
					headerShown: false,
				})}
			/>
			<Setting.Screen
				name="Payment"
				component={PaymentNavigator}
				options={(options: Option) => ({
					title: "決済一覧",
					headerLeft: () => <PrevButton {...options} screen="SettingSelect" />,
				})}
			/>
		</Setting.Navigator>
	);
};
