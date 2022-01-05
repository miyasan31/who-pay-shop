import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { VFC } from "react";
import React from "react";
import type { PaymentStackParamList } from "types";

import { CalculatorScreen } from "./CalculatorScreen";
import { PasscodeScreen } from "./PasscodeScreen";
import { VoiceRecord } from "./VoiceRecord";

const PaymentStack = createNativeStackNavigator<PaymentStackParamList>();

export const PaymentNavigator: VFC = () => {
	return (
		<PaymentStack.Navigator
			initialRouteName="Calculator"
			screenOptions={{
				title: "Who Pay",
				headerBackTitle: "戻る",
			}}
		>
			<PaymentStack.Screen
				name="Calculator"
				component={CalculatorScreen}
				options={() => ({})}
			/>
			<PaymentStack.Screen
				name="VoiceRecord"
				component={VoiceRecord}
				options={() => ({})}
			/>
			<PaymentStack.Screen
				name="Passcode"
				component={PasscodeScreen}
				options={() => ({})}
			/>
		</PaymentStack.Navigator>
	);
};
