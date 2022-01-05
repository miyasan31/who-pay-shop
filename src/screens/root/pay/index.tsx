import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { VFC } from "react";
import React from "react";
import type { PayStackParamList } from "types";

import { CalculatorScreen } from "./CalculatorScreen";
import { PasscodeScreen } from "./PasscodeScreen";
import { VoiceRecord } from "./VoiceRecord";

const PayStack = createNativeStackNavigator<PayStackParamList>();

export const PayNavigator: VFC = () => {
	return (
		<PayStack.Navigator
			initialRouteName="Calculator"
			screenOptions={{
				title: "Who Pay",
				headerBackTitle: "戻る",
			}}
		>
			<PayStack.Screen
				name="Calculator"
				component={CalculatorScreen}
				options={() => ({})}
			/>
			<PayStack.Screen
				name="VoiceRecord"
				component={VoiceRecord}
				options={() => ({})}
			/>
			<PayStack.Screen
				name="Passcode"
				component={PasscodeScreen}
				options={() => ({})}
			/>
		</PayStack.Navigator>
	);
};
