import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type {
	CompositeScreenProps,
	NavigatorScreenParams,
} from "@react-navigation/native";
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

	Calculator: undefined;
	VoiceRecord: { price: string };
	PassCode: { price: string };

	Modal: undefined;
	NotFound: undefined;
};

export type StackScreenProps<T extends keyof RootStackParamList> =
	NativeStackScreenProps<RootStackParamList, T>;

export type TabScreenProps<T extends keyof RootTabParamList> =
	CompositeScreenProps<
		BottomTabScreenProps<RootTabParamList, T>,
		NativeStackScreenProps<RootStackParamList>
	>;
