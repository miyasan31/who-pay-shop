import type { VFC } from "react";
import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { user } from "src/atom";
import { ErrorMessage } from "src/components";
import { ColorButton, Text, TextInput, View } from "src/components/custom";
import { saveSequreStore } from "src/functions/store";
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

export const SigninScreen: VFC<AuthScreenProps<"Signin">> = (props) => {
	const setUserInfo = useSetRecoilState(user);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormDataType>();

	const onSubmitPress = useCallback(async (body: FormDataType) => {
		console.info("POST Request Body", body);
		console.info("Listen Auth Signup");
		console.info("Navigate to Signup");
		await saveSequreStore("access-token", "123456789");
		setUserInfo((prev) => ({ ...prev, isSignin: true }));
	}, []);

	const onNavigateSignup = useCallback(() => {
		props.navigation.navigate("Signup");
	}, [props]);

	return (
		<View style={viewStyles.semi}>
			<Text style={textStyles.title}>サインイン</Text>

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
						onChangeText={onChange}
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
						onChangeText={onChange}
						value={value}
						placeholder=""
					/>
				)}
			/>
			{errors.password && <ErrorMessage message={errors.password.message} />}

			<ColorButton
				title="サインイン"
				outlineStyle={buttonStyles.outline}
				// eslint-disable-next-line react/jsx-handler-names
				onPress={handleSubmit(onSubmitPress)}
			/>

			<Text style={buttonStyles.register} onPress={onNavigateSignup}>
				アカウント作成はこちら
			</Text>
		</View>
	);
};
