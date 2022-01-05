// import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { PayNavigator } from "src/screens/root/pay";
import { SettingNavigator } from "src/screens/root/setting";
import type { RootStackParamList } from "types";

// const Drawer = createDrawerNavigator<RootStackParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
	return (
		<RootStack.Navigator initialRouteName="Pay">
			<RootStack.Screen
				name="Pay"
				component={PayNavigator}
				options={{ headerShown: false }}
			/>
			<RootStack.Screen
				name="Setting"
				component={SettingNavigator}
				options={{ headerShown: false }}
			/>
		</RootStack.Navigator>
	);
};
