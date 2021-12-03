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
	phone: string;
	password: string;
};

export const SignupScreen: VFC<StackScreenProps<"Signup">> = (props) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormDataType>();

	const onSubmitPress = useCallback(
		(body: FormDataType) => {
			const requestBody = { phone: "81" + body.phone, password: body.password };
			console.info("POST Request Body", requestBody);
			props.navigation.navigate("Verify", { phone: body.phone });
		},
		[props]
	);

	return (
		<View style={viewStyles.semi}>
			<Text style={textStyles.title}>アカウント作成</Text>
			<Text style={textStyles.label}>電話番号</Text>
			<Controller
				control={control}
				name="phone"
				defaultValue=""
				rules={{
					required: {
						value: true,
						message: "必須入力項目です",
					},
				}}
				render={({ field: { onChange, value } }) => (
					<TextInput
						bgStyle={textInputStyles.bg}
						onChangeText={(value) => onChange(value)}
						value={value}
						placeholder=""
					/>
				)}
			/>
			{errors.phone && <ErrorMessage message={errors.phone.message} />}

			<Text style={textStyles.label}>パスワード</Text>
			<Controller
				control={control}
				name="password"
				defaultValue=""
				rules={{
					required: {
						value: true,
						message: "必須入力項目です",
					},
				}}
				render={({ field: { onChange, value } }) => (
					<TextInput
						bgStyle={textInputStyles.bg}
						onChangeText={(value) => onChange(value)}
						value={value}
						placeholder=""
					/>
				)}
			/>
			{errors.password && <ErrorMessage message={errors.password.message} />}

			<ColorButton
				title="確認コードを受け取る"
				outlineStyle={buttonStyles.outline}
				// eslint-disable-next-line react/jsx-handler-names
				onPress={handleSubmit(onSubmitPress)}
			/>
		</View>
	);
};
