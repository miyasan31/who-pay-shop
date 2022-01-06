/* eslint-disable react/destructuring-assignment */
import type { ReactNode, VFC } from "react";
import React from "react";
import { StyleSheet } from "react-native";
import type { ViewProps } from "src/components/custom";
import { View } from "src/components/custom";
import { KeyboardAvoiding } from "src/components/layout/KeyboardAvoiding";
import { useThemeColor } from "src/hooks";

type Props = ViewProps & {
  children: ReactNode;
};

export const Layout: VFC<Props> = (props) => {
  const { style, lightBgColor, darkBgColor, children } = props;

  const backgroundColor = useThemeColor({ light: lightBgColor, dark: darkBgColor }, "bg1");
  return (
    <KeyboardAvoiding>
      <View style={[defaultStyle.full, style, { backgroundColor }]}>{children}</View>
    </KeyboardAvoiding>
  );
};

const defaultStyle = StyleSheet.create({
  full: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  semi: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: "10%",
  },
});
