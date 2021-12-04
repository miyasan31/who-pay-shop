import type { VFC } from "react";
import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { ColorButton, Text, TextInput, View } from "src/components/custom";
import { ErrorMessage } from "src/components/ErrorMessage";
import {
	buttonStyles,
	textInputStyles,
	textStyles,
	viewStyles,
} from "src/styles";
import type { StackScreenProps } from "types";

type FormDataType = {
	verifyCode: string;
};

export const VerifyScreen: VFC<StackScreenProps<"Verify">> = (props) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormDataType>();

	const onSubmitPress = useCallback(
		(body: FormDataType) => {
			const { phone } = props.route.params;
			const requestBody = { phone: "81" + phone, token: body.verifyCode };
			console.info("POST Request Body", requestBody);
			props.navigation.navigate("ShopInfoRegister", { phone: phone });
		},
		[props]
	);

	return (
		<View style={viewStyles.semi}>
			<Text style={textStyles.title}>確認コード</Text>

			<Text style={textStyles.label}>パスワード</Text>
			<Controller
				control={control}
				name="verifyCode"
				defaultValue=""
				rules={{
					required: {
						value: true,
						message: "必須入力項目です",
					},
					minLength: 6,
					maxLength: 6,
				}}
				render={({ field: { onChange, value } }) => (
					<TextInput
						bgStyle={textInputStyles.bg}
						onChangeText={onChange}
						value={value}
						placeholder=""
					/>
				)}
			/>
			{errors.verifyCode && (
				<ErrorMessage message={errors.verifyCode.message} />
			)}

			<ColorButton
				title="送信"
				outlineStyle={buttonStyles.outline}
				// eslint-disable-next-line react/jsx-handler-names
				onPress={handleSubmit(onSubmitPress)}
			/>
		</View>
	);
};
