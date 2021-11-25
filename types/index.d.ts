/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/naming-convention */

/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import type { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
	namespace ReactNavigation {
		type RootParamList = RootStackParamList;
	}
}

export type RootStackParamList = {
	Root: NavigatorScreenParams<RootTabParamList> | undefined;

	Signin: undefined;
	Signup: undefined;
	Verify: { phone: string };

	Modal1: undefined;
	Modal2: undefined;
	NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
	RootStackParamList,
	Screen
>;

export type RootTabParamList = {
	TabOne: undefined;
	TabTwo: undefined;
	TabThree: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
	BottomTabScreenProps<RootTabParamList, Screen>,
	NativeStackScreenProps<RootStackParamList>
>;

type ScreenProp = NativeStackNavigationProp<RootStackParamList>;
