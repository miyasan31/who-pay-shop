import type { VFC } from "react";
import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "src/components";
import { ColorButton, Text, TextInput, View } from "src/components/custom";
import {
	buttonStyles,
	textInputStyles,
	textStyles,
	viewStyles,
} from "src/styles";
import type { AuthScreenProps } from "types";

type FormDataType = {
	shopName: string;
	passcode: string;
	creditNumber: string;
	securityCode: string;
	email: string;
};

export const ShopInfoRegisterScreen: VFC<AuthScreenProps<"ShopInfoRegister">> =
	(props) => {
		const {
			control,
			handleSubmit,
			formState: { errors },
		} = useForm<FormDataType>();

		const onSubmitPress = useCallback(
			(body: FormDataType) => {
				const { phone } = props.route.params;
				props.navigation.navigate("ShopInfoVerification", {
					...body,
					phone: phone,
				});
			},
			[props]
		);

		return (
			<View style={viewStyles.semi}>
				<Text style={textStyles.title}>店舗情報登録</Text>

				<Text style={textStyles.label}>店舗名</Text>
				<Controller
					control={control}
					name="shopName"
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
				{errors.shopName && <ErrorMessage message={errors.shopName.message} />}

				<Text style={textStyles.label}>４桁のパスコード</Text>
				<Controller
					control={control}
					name="passcode"
					defaultValue=""
					rules={{
						required: {
							value: true,
							message: "必須入力項目です",
						},
						minLength: 4,
						maxLength: 4,
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
				{errors.passcode && <ErrorMessage message={errors.passcode.message} />}

				<Text style={textStyles.label}>クレジットカード番号</Text>
				<Controller
					control={control}
					name="creditNumber"
					defaultValue=""
					rules={{
						required: {
							value: true,
							message: "必須入力項目です",
						},
						minLength: 14,
						maxLength: 16,
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
				{errors.creditNumber && (
					<ErrorMessage message={errors.creditNumber.message} />
				)}

				<Text style={textStyles.label}>セキュリティコード</Text>
				<Controller
					control={control}
					name="securityCode"
					defaultValue=""
					rules={{
						required: {
							value: true,
							message: "必須入力項目です",
						},
						minLength: 3,
						maxLength: 3,
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
				{errors.securityCode && (
					<ErrorMessage message={errors.securityCode.message} />
				)}

				<Text style={textStyles.label}>メールアドレス</Text>
				<Controller
					control={control}
					name="email"
					defaultValue=""
					rules={{
						required: {
							value: true,
							message: "必須入力項目です",
						},
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: "メールアドレスの形式が正しくありません",
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
				{errors.email && <ErrorMessage message={errors.email.message} />}

				<ColorButton
					title="登録"
					outlineStyle={buttonStyles.outline}
					// eslint-disable-next-line react/jsx-handler-names
					onPress={handleSubmit(onSubmitPress)}
				/>
			</View>
		);
	};
