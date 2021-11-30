import type { Dispatch, SetStateAction, VFC } from "react";
import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { ColorButton, Text, TextInput, View } from "src/components";
import { buttonStyles, viewStyles } from "src/styles";
import type { StackScreenProps } from "types";

// モーダルを開いた時の画面（下から出てくるやつ）
export const SignupScreen: VFC<StackScreenProps<"Signup">> = (props) => {
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");

	const onChangeText = useCallback((text: string, setStateAction: Dispatch<SetStateAction<string>>) => {
		setStateAction(text);
	}, []);

	const onSignup = useCallback(async (phone: string, password: string) => {
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
		// console.log(result);

		props.navigation.navigate("Verify", { phone });
	}, []);

	return (
		<View style={viewStyles.semi}>
			<Text style={styles.title}>アカウント作成</Text>

			<Text style={inputStyles.label}>電話番号</Text>
			<TextInput
				bgStyle={inputStyles.bg}
				onChangeText={(text) => onChangeText(text, setPhone)}
				value={phone}
				placeholder=""
			/>

			<Text style={inputStyles.label}>パスワード</Text>
			<TextInput
				bgStyle={inputStyles.bg}
				onChangeText={(text) => onChangeText(text, setPassword)}
				value={password}
				placeholder=""
			/>

			<ColorButton
				title="確認コードを受け取る"
				textStyle={buttonStyles.text}
				bgStyle={buttonStyles.button}
				outlineStyle={buttonStyles.outline}
				onPress={() => onSignup(phone, password)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
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
