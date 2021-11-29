/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/naming-convention */

/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
	namespace ReactNavigation {
		type RootParamList = RootStackParamList;
	}
}

export type RootTabParamList = {
	TabOne: undefined;
	TabTwo: undefined;
	TabThree: undefined;
};

export type RootStackParamList = {
	Root: NavigatorScreenParams<RootTabParamList> | undefined;

	Signin: undefined;
	Signup: undefined;
	Verify: { phone: string };

	Record: { price: string };
	Calculator: undefined;

	Modal1: undefined;
	Modal2: undefined;
	NotFound: undefined;
};

export type StackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

export type TabScreenProps<T extends keyof RootTabParamList> = CompositeScreenProps<
	BottomTabScreenProps<RootTabParamList, T>,
	NativeStackScreenProps<RootStackParamList>
>;
