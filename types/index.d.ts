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

export type RootStackParamList = {
	Auth: NavigatorScreenParams<AuthStackParamList> | undefined;
	Pay: NavigatorScreenParams<PayStackParamList> | undefined;
	Setting: NavigatorScreenParams<SettingStackParamList> | undefined;
	Modal: undefined;
	NotFound: undefined;
	// Root: NavigatorScreenParams<BottomTabScreenProps> | undefined;
};
export type StackScreenProps<T extends keyof RootStackParamList> =
	NativeStackScreenProps<RootStackParamList, T>;

/* 認証 */
export type AuthStackParamList = {
	SigninAction: undefined;
	Signin: undefined;
	Signup: undefined;
	Verify: { phone: string };
	ShopInfoRegister: undefined;
};
export type AuthScreenProps<T extends keyof AuthStackParamList> =
	CompositeScreenProps<
		BottomTabScreenProps<AuthStackParamList, T>,
		NativeStackScreenProps<RootStackParamList>
	>;
/* ---- */

/* 決済 */
export type PayStackParamList = {
	Calculator: undefined;
	VoiceRecord: { price: string };
	Passcode: { price: string };
};
export type PayScreenProps<T extends keyof PayStackParamList> =
	CompositeScreenProps<
		BottomTabScreenProps<PayStackParamList, T>,
		NativeStackScreenProps<RootStackParamList>
	>;
/* ---- */

/* 設定 */
export type SettingStackParamList = {
	SettingSelect: undefined;
	AccountSetting: NavigatorScreenParams<AccountStackParamList> | undefined;
	Payment: NavigatorScreenParams<PaymentStackParamList> | undefined;
};
export type SettingScreenProps<T extends keyof SettingStackParamList> =
	CompositeScreenProps<
		BottomTabScreenProps<SettingStackParamList, T>,
		NativeStackScreenProps<RootStackParamList>
	>;
/* ---- */

/* アカウント */
export type AccountStackParamList = {
	// AccountSettingSelect: undefined;
	Account: undefined;
	AccountUpdate: undefined;
};
export type AccountScreenProps<T extends keyof AccountStackParamList> =
	CompositeScreenProps<
		BottomTabScreenProps<AccountStackParamList, T>,
		NativeStackScreenProps<RootStackParamList>
	>;
/* ---- */

/* 決済履歴 */
export type PaymentStackParamList = {
	PaymentList: undefined;
	PaymentDetail: {
		id: number;
	};
};
export type PaymentScreenProps<T extends keyof PaymentStackParamList> =
	CompositeScreenProps<
		BottomTabScreenProps<PaymentStackParamList, T>,
		NativeStackScreenProps<RootStackParamList>
	>;
/* ---- */

/* 未使用 */
// export type BottomTabParamList = {
// 	TabOne: undefined;
// 	TabTwo: undefined;
// 	TabThree: undefined;
// };
// export type BottomTabScreenProps<T extends keyof BottomTabParamList> =
// 	CompositeScreenProps<
// 		BottomTabScreenProps<BottomTabParamList, T>,
// 		NativeStackScreenProps<RootStackParamList>
// 	>;
/* ---- */
