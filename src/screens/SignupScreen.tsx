import type { VFC } from "react";
import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { TouchableWithoutFeedback } from "react-native";
import { ColorButton, Text, TextInput, View } from "src/components/custom";
import { ErrorMessage } from "src/components/ErrorMessage";
import { onKeyBoardClose } from "src/functions";
import { requestFetcher } from "src/functions/fetcher";
import { useThemeColor } from "src/hooks";
import {
	buttonStyles,
	textInputStyles,
	textStyles,
	viewStyles,
} from "src/styles";
import type { AuthScreenProps } from "types";

type FormDataType = {
	phone: string;
	password: string;
};

export const SignupScreen: VFC<AuthScreenProps<"Signup">> = (props) => {
	const color = useThemeColor({}, "text2");
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormDataType>();

	const onSubmitPress = useCallback(
		async (body: FormDataType) => {
			const requestBody = { phone: "81" + body.phone, password: body.password };
			const status = await requestFetcher("/auth/signup", requestBody, "POST");
			if (status >= 400) {
				console.info("不正なリクエスト");
				return;
			}
			props.navigation.navigate("Verify", { phone: body.phone });
		},
		[props]
	);

	return (
		<TouchableWithoutFeedback onPress={onKeyBoardClose}>
			<View style={viewStyles.semi}>
				<Text style={textStyles.title}>アカウント作成</Text>
				<Text
					lightTextColor={color}
					darkTextColor={color}
					style={textStyles.label}
				>
					電話番号
				</Text>
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
							onChangeText={onChange}
							value={value}
							placeholder=""
						/>
					)}
				/>
				{errors.phone && <ErrorMessage message={errors.phone.message} />}

				<Text
					lightTextColor={color}
					darkTextColor={color}
					style={textStyles.label}
				>
					パスワード
				</Text>
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
							onChangeText={onChange}
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
		</TouchableWithoutFeedback>
	);
};
