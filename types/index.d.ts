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
  Main: NavigatorScreenParams<MainStackParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
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
    NativeStackScreenProps<AuthStackParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;
/* ---- */

/* 下タブ */
export type MainStackParamList = {
  Pay: NavigatorScreenParams<PayStackParamList> | undefined;
  Setting: NavigatorScreenParams<SettingStackParamList> | undefined;
};
export type MainScreenProps<T extends keyof MainStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<MainStackParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;
/* ---- */

/* 決済 */
export type PayStackParamList = {
  Calculator: undefined;
  VoiceRecord: { amount: string };
  Passcode: { amount: string; uri: string };
};
export type PayScreenProps<T extends keyof PayStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<PayStackParamList, T>,
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
    NativeStackScreenProps<SettingStackParamList, T>,
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
    NativeStackScreenProps<AccountStackParamList, T>,
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
    NativeStackScreenProps<PaymentStackParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;
/* ---- */
