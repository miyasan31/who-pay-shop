/* eslint-disable @typescript-eslint/naming-convention */
import { useNavigation } from "@react-navigation/native";
import type { VFC } from "react";
import React, { useCallback, useState } from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { ColorButton, Text, View } from "src/components";
import { onKeyBoardClose } from "src/functions/onKeyBoardClose";
import type { RootTabScreenProps, ScreenProp } from "types";

// TabOneScreenの画面
export const TabOneScreen: VFC<RootTabScreenProps<"TabOne">> = () => {
	const navigation = useNavigation<ScreenProp>();
	const [count, setCount] = useState(0);

	const onCount = useCallback(() => {
		setCount((count) => {
			if (count === 2) {
				navigation.navigate("Signin");
				return 0;
			}
			return count + 1;
		});
	}, []);

	return (
		<TouchableWithoutFeedback onPress={onKeyBoardClose}>
			<View style={styles.container}>
				<Text style={styles.title}>サインインなう</Text>

				<View style={styles.separator} lightBgColor="#eee" darkBgColor="rgba(255,255,255,0.1)" />

				<Text>カウンター{count}</Text>
				<Text>3回押すとサインインに戻るよ</Text>

				<ColorButton
					textStyle={styles.buttonLabel}
					lightTextColor="#ffffff"
					darkTextColor="#ffffff"
					bgStyle={styles.button}
					lightBgColor="#4882ff"
					darkBgColor="#ff8c00"
					title="無限ボタン"
					onPress={onCount}
				/>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		paddingVertical: 10,
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
	inputWrap: {
		minWidth: "80%",
		padding: 10,
		borderRadius: 10,
	},
	buttonLabel: {
		fontSize: 20,
	},
	button: {
		// boxShadow
		shadowColor: "#656565a2",
		shadowOffset: { width: 0, height: 1 },
		shadowRadius: 5,
		shadowOpacity: 0.6,
	},
});
