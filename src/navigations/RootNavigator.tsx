import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useColorScheme } from "src/hooks";
// import { BottomTabNavigator } from "src/navigations/BottomTabNavigator";
import {
	CalculatorScreen,
	ModalScreen,
	NotFoundScreen,
	PassCodeScreen,
	SigninScreen,
	SignupScreen,
	VerifyScreen,
	VoiceRecord,
} from "src/screens";
import { theme } from "src/styles";
import type { RootStackParamList } from "types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const isSignined = true;

export const RootNavigator = () => {
	const colorScheme = useColorScheme();

	return (
		<Stack.Navigator initialRouteName={isSignined ? "Root" : "Calculator"}>
			<Stack.Screen
				name="Signin"
				component={SigninScreen}
				options={() => ({
					headerShown: false,
				})}
			/>
			<Stack.Screen
				name="Signup"
				component={SignupScreen}
				options={() => ({
					headerShown: false,
				})}
			/>
			<Stack.Screen
				name="Verify"
				component={VerifyScreen}
				options={() => ({
					headerShown: false,
				})}
			/>

			<Stack.Screen
				name="Calculator"
				component={CalculatorScreen}
				options={() => ({
					headerShown: false,
				})}
			/>
			<Stack.Screen
				name="VoiceRecord"
				component={VoiceRecord}
				options={() => ({
					headerShown: false,
				})}
			/>
			<Stack.Screen
				name="PassCode"
				component={PassCodeScreen}
				options={() => ({
					headerShown: false,
				})}
			/>

			{/* <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} /> */}

			<Stack.Group screenOptions={{ presentation: "modal" }}>
				<Stack.Screen
					name="Modal"
					options={() => ({
						headerStyle: {
							backgroundColor: theme[colorScheme].bg0,
						},
					})}
					component={ModalScreen}
				/>
			</Stack.Group>

			<Stack.Screen
				name="NotFound"
				component={NotFoundScreen}
				options={{ title: "Oops!" }}
			/>
		</Stack.Navigator>
	);
};
