import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { VFC } from "react";
import React from "react";
import { HeaderButton } from "src/components";
import type { MainScreenProps, PayScreenProps, PayStackParamList } from "types";

import { CalculatorScreen } from "./CalculatorScreen";
import { PasscodeScreen } from "./PasscodeScreen";
import { VoiceRecord } from "./VoiceRecord";

type Option = MainScreenProps<"Setting"> | PayScreenProps<"Calculator">;

const PayStack = createNativeStackNavigator<PayStackParamList>();

export const PayNavigator: VFC = () => {
  return (
    <PayStack.Navigator
      initialRouteName="Calculator"
      screenOptions={{
        title: "Who PAY",
      }}
    >
      <PayStack.Screen
        name="Calculator"
        component={CalculatorScreen}
        options={(option: Option) => ({
          headerRight: () => <HeaderButton {...option} screen="Setting" />,
        })}
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
