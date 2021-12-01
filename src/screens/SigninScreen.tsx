import type { Dispatch, SetStateAction, VFC } from "react";
import React, { useCallback, useState } from "react";
import { ColorButton, Text, TextInput, View } from "src/components";
import {
	buttonStyles,
	textInputStyles,
	textStyles,
	viewStyles,
} from "src/styles";
import type { StackScreenProps } from "types";

// モーダルを開いた時の画面（下から出てくるやつ）
export const SigninScreen: VFC<StackScreenProps<"Signin">> = (props) => {
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");

	const onChangeText = useCallback(
		(text: string, setStateAction: Dispatch<SetStateAction<string>>) => {
			setStateAction(text);
		},
		[]
	);

	const onSignin = useCallback((phone: string, password: string) => {
		const body = { phone: "81" + phone, password: password };
		console.info("POST Request Body", body);
		props.navigation.navigate("Calculator");
	}, []);

	const onNavigateSignup = useCallback(() => {
		props.navigation.navigate("Signup");
	}, []);

	return (
		<View style={viewStyles.semi}>
			<Text style={textStyles.title}>アカウント作成</Text>

			<Text style={textStyles.label}>電話番号</Text>
			<TextInput
				bgStyle={textInputStyles.bg}
				onChangeText={(text) => onChangeText(text, setPhone)}
				value={phone}
				placeholder=""
			/>

			<Text style={textStyles.label}>パスワード</Text>
			<TextInput
				bgStyle={textInputStyles.bg}
				onChangeText={(text) => onChangeText(text, setPassword)}
				value={password}
				placeholder=""
			/>

			<ColorButton
				title="サインイン"
				outlineStyle={buttonStyles.outline}
				onPress={() => onSignin(phone, password)}
			/>

			<Text style={buttonStyles.register} onPress={onNavigateSignup}>
				アカウント作成はこちら
			</Text>
		</View>
	);
};
