import type { Dispatch, SetStateAction, VFC } from "react";
import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { ColorButton, Text, TextInput, View } from "src/components";
import type { StackScreenProps } from "types";

// モーダルを開いた時の画面（下から出てくるやつ）
export const VerifyScreen: VFC<StackScreenProps<"Verify">> = (props) => {
	const { phone } = props.route.params;
	const [password, setPassword] = useState("");

	const onChangeText = useCallback((text: string, setStateAction: Dispatch<SetStateAction<string>>) => {
		setStateAction(text);
	}, []);

	const onPostVerifyCode = useCallback(async (phone: string, password: string) => {
		console.info(phone, password);
		// const result = await fetch("http://localhost:4000/auth/signup", {
		// 	method: "POST",
		// 	headers: {
		// 		Accept: "application/json",
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify({
		// 		phone: "81" + phone,
		// 		password: password,
		// 	}),
		// });
		props.navigation.navigate("Root");
	}, []);

	return (
		<View style={styles.root}>
			<Text style={styles.title}>確認コード</Text>

			<Text style={inputStyles.label}>パスワード</Text>
			<TextInput
				bgStyle={inputStyles.bg}
				onChangeText={(text) => onChangeText(text, setPassword)}
				value={password}
				placeholder=""
			/>

			<ColorButton
				textStyle={buttonStyles.text}
				lightTextColor="#ffffff"
				darkTextColor="#ffffff"
				bgStyle={buttonStyles.button}
				lightBgColor="#00e8bd"
				darkBgColor="#00cba6"
				outlineStyle={buttonStyles.outline}
				title="送信"
				onPress={() => onPostVerifyCode(phone, password)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
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
});

const inputStyles = StyleSheet.create({
	label: {
		paddingVertical: 10,
		fontSize: 15,
		fontWeight: "bold",
		textAlignVertical: "center",
	},
	bg: {
		borderRadius: 10,
		padding: 12,
	},
});

export const buttonStyles = StyleSheet.create({
	outline: { marginTop: 20 },
	text: {},
	button: {},
	register: {
		paddingVertical: 15,
		textAlign: "right",
	},
});
