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
export const SignupScreen: VFC<StackScreenProps<"Signup">> = (props) => {
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");

	const onChangeText = useCallback(
		(text: string, setStateAction: Dispatch<SetStateAction<string>>) => {
			setStateAction(text);
		},
		[]
	);

	const onSignup = useCallback(async (phone: string, password: string) => {
		const body = { phone: "81" + phone, password: password };
		console.info("POST Request Body", body);
		props.navigation.navigate("Verify", { phone });
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
				title="確認コードを受け取る"
				outlineStyle={buttonStyles.outline}
				onPress={() => onSignup(phone, password)}
			/>
		</View>
	);
};
