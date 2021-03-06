import { StatusBar } from "expo-status-bar";
import type { VFC } from "react";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { Text, View } from "src/components/custom";
import type { StackScreenProps } from "types";

export const ModalScreen: VFC<StackScreenProps<"Modal">> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal 1</Text>

      <View style={styles.separator} lightBgColor="#eee" darkBgColor="rgba(255,255,255,0.1)" />

      {/*  iOSの簡易的なステータスバーを使用して、モーダルの上の黒いスペースを考慮する  */}
      <StatusBar style={Platform.OS === "ios" ? "dark" : "auto"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
