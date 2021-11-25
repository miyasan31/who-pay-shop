import type { VFC } from "react";
import React, { useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { RootStackScreenProps } from "types";

// ページが見つからなかった場合の画面
export const NotFoundScreen: VFC<RootStackScreenProps<"NotFound">> = (props) => {
	const onRootScreenPush = useCallback(() => {
		props.navigation.replace("Root");
	}, [props.navigation]);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>This screen doesn&apos;t exist.</Text>
			<TouchableOpacity onPress={onRootScreenPush} style={styles.link}>
				<Text style={styles.linkText}>Go to home screen!</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	link: {
		marginTop: 15,
		paddingVertical: 15,
	},
	linkText: {
		fontSize: 14,
		color: "#2e78b7",
	},
});
