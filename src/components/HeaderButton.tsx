/* eslint-disable no-mixed-spaces-and-tabs */
import { MaterialIcons } from "@expo/vector-icons";
// import { createDrawerNavigator } from "@react-navigation/drawer";
import type { VFC } from "react";
import React, { useCallback } from "react";
import { Pressable, StyleSheet } from "react-native";
import { useThemeColor } from "src/hooks";
import type { MainScreenProps, PayScreenProps, SettingScreenProps } from "types";

type Props = (
  | MainScreenProps<"Setting">
  | PayScreenProps<"Calculator">
  | SettingScreenProps<"SettingSelect" | "Payment">
) & {
  screen: "Setting" | "Pay";
};

export const HeaderButton: VFC<Props> = (props) => {
  const icon1 = useThemeColor({}, "icon1");

  const onPrevScreen = useCallback((navigation) => {
    navigation.replace(props.screen);
  }, []);

  return (
    <Pressable
      onPress={() => onPrevScreen(props.navigation)}
      style={({ pressed }) => [{ opacity: pressed ? 0.4 : 1 }, styles.prev]}
    >
      <MaterialIcons name="settings" size={24} color={icon1} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonLabel: {
    fontWeight: "400",
  },
  prev: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",

    width: 40,
    marginLeft: 20,
  },
});
