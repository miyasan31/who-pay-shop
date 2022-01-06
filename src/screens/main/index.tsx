// import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { PayNavigator } from "src/screens/main/pay";
import { SettingNavigator } from "src/screens/main/setting";
import type { MainStackParamList } from "types";

// const Drawer = createDrawerNavigator<MainStackParamList>();
const MainStack = createNativeStackNavigator<MainStackParamList>();

export const MainNavigator = () => {
	return (
		<MainStack.Navigator
			initialRouteName="Pay"
			screenOptions={{
				headerShown: false,
			}}
		>
			<MainStack.Screen name="Pay" component={PayNavigator} />
			<MainStack.Screen name="Setting" component={SettingNavigator} />
		</MainStack.Navigator>
	);
};
