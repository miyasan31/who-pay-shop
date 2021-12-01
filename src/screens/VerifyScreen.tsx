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
export const VerifyScreen: VFC<StackScreenProps<"Verify">> = (props) => {
	const { phone } = props.route.params;
	const [verifyCode, setVerifyCode] = useState("");

	const onChangeText = useCallback(
		(text: string, setStateAction: Dispatch<SetStateAction<string>>) => {
			setStateAction(text);
		},
		[]
	);

	const onPostVerifyCode = useCallback(
		async (phone: string, verifyCode: string) => {
			const body = { phone: "81" + phone, token: verifyCode };
			console.info("POST Request Body", body);
			props.navigation.navigate("Calculator");
		},
		[]
	);

	return (
		<View style={viewStyles.semi}>
			<Text style={textStyles.title}>確認コード</Text>

			<Text style={textStyles.label}>パスワード</Text>
			<TextInput
				bgStyle={textInputStyles.bg}
				onChangeText={(text) => onChangeText(text, setVerifyCode)}
				value={verifyCode}
				placeholder=""
			/>

			<ColorButton
				title="送信"
				outlineStyle={buttonStyles.outline}
				onPress={() => onPostVerifyCode(phone, verifyCode)}
			/>
		</View>
	);
};
