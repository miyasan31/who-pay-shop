import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useColorScheme } from "src/hooks";
import {
	CalculatorScreen,
	ModalScreenOne,
	ModalScreenTwo,
	NotFoundScreen,
	RecordScreen,
	SigninScreen,
	SignupScreen,
	VerifyScreen,
} from "src/screens";
import { theme } from "src/styles";
import type { RootStackParamList } from "types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const isSignined = false;

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
				name="Record"
				component={RecordScreen}
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

			{/* <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} /> */}

			<Stack.Group screenOptions={{ presentation: "modal" }}>
				<Stack.Screen
					name="Modal1"
					options={() => ({
						headerStyle: {
							backgroundColor: theme[colorScheme].backgroundSub,
						},
					})}
					component={ModalScreenOne}
				/>
				<Stack.Screen
					name="Modal2"
					options={() => ({
						headerStyle: {
							backgroundColor: theme[colorScheme].backgroundSub,
						},
					})}
					component={ModalScreenTwo}
				/>
			</Stack.Group>

			<Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: "Oops!" }} />
		</Stack.Navigator>
	);
};
