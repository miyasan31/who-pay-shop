import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { VFC } from "react";
import React from "react";
import type { AuthStackParamList } from "types";

import { ShopInfoRegisterScreen } from "./ShopInfoRegisterScreen";
import { SigninActionScreen } from "./SigninActionScreen";
import { SigninScreen } from "./SigninScreen";
import { SignupScreen } from "./SignupScreen";
import { VerifyScreen } from "./VerifyScreen";

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator: VFC = () => {
  return (
    <AuthStack.Navigator initialRouteName="SigninAction" screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="SigninAction" component={SigninActionScreen} options={() => ({})} />
      <AuthStack.Screen name="Signin" component={SigninScreen} options={() => ({})} />
      <AuthStack.Screen name="Signup" component={SignupScreen} options={() => ({})} />
      <AuthStack.Screen name="Verify" component={VerifyScreen} options={() => ({})} />
      <AuthStack.Screen
        name="ShopInfoRegister"
        component={ShopInfoRegisterScreen}
        options={() => ({})}
      />
    </AuthStack.Navigator>
  );
};
