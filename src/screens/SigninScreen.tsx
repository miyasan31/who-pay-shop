import type { Dispatch, SetStateAction, VFC } from "react";
import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { ColorButton, Text, TextInput, View } from "src/components";
import { buttonStyles, viewStyles } from "src/styles";
import type { StackScreenProps } from "types";

// モーダルを開いた時の画面（下から出てくるやつ）
export const SigninScreen: VFC<StackScreenProps<"Signin">> = (props) => {
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");

	const onChangeText = useCallback((text: string, setStateAction: Dispatch<SetStateAction<string>>) => {
		setStateAction(text);
	}, []);

	const onSignin = useCallback((phone: string, password: string) => {
		console.info(phone, password);
		props.navigation.navigate("Calculator");
	}, []);

	const onNavigateSignup = useCallback(() => {
		props.navigation.navigate("Signup");
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
				title="サインイン"
				textStyle={buttonStyles.text}
				bgStyle={buttonStyles.button}
				outlineStyle={buttonStyles.outline}
				onPress={() => onSignin(phone, password)}
			/>

			<Text style={buttonStyles.register} onPress={onNavigateSignup}>
				アカウント作成はこちら
			</Text>
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
		textAlign: "left",
		paddingVertical: 10,
		fontSize: 15,
		fontWeight: "bold",
	},
	bg: {
		borderRadius: 10,
		padding: 12,
	},
});
