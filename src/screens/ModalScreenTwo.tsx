import { StatusBar } from "expo-status-bar";
import type { VFC } from "react";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { Text, View } from "src/components";

// モーダルを開いた時の画面（下から出てくるやつ）
export const ModalScreenTwo: VFC = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Modal 2</Text>
			<View style={styles.separator} lightBgColor="#eee" darkBgColor="rgba(255,255,255,0.1)" />

			{/* Use a light status bar on iOS to account for the black space above the modal */}
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
