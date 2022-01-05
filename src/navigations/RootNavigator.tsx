// import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { PaymentNavigator } from "src/screens/payment";
import type { RootStackParamList } from "types";

// const Drawer = createDrawerNavigator<RootStackParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
	return (
		<RootStack.Navigator initialRouteName="Payment">
			<RootStack.Screen
				name="Payment"
				component={PaymentNavigator}
				options={{ headerShown: false }}
			/>
		</RootStack.Navigator>
	);
};
