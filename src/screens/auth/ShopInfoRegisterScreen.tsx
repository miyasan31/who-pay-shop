import type { VFC } from "react";
import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast/src/core/toast";
import { useRecoilState } from "recoil";
import { shop } from "src/atoms";
import { ErrorMessage } from "src/components";
import { ColorButton, Text, TextInput } from "src/components/custom";
import { AuthLayout } from "src/components/layout";
import { requestFetcher } from "src/functions/fetcher/requestFetcher";
import { saveSequreStore } from "src/functions/store";
import { useThemeColor } from "src/hooks";
import { buttonStyles, textInputStyles, textStyles } from "src/styles";
import type { AuthScreenProps } from "types";
import type { User } from "types/fetcher";

type FormDataType = {
	shopName: string;
	address: string;
	email?: string;
	phone?: string;
};

export const ShopInfoRegisterScreen: VFC<
	AuthScreenProps<"ShopInfoRegister">
> = () => {
	const color = useThemeColor({}, "text2");
	const [shopInfo, setShopInfo] = useRecoilState(shop);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormDataType>();

	const onSubmitPress = useCallback(async (body: FormDataType) => {
		const toastId = toast.loading("処理中...", {
			icon: "💁‍♂️",
		});

		const requestBody = {
			...body,
			id: shopInfo.id,
			phone: body.phone || shopInfo.phone,
			email: body.email || shopInfo.email,
			token: shopInfo.token,
		};

		const { statusCode, response } = await requestFetcher<User>(
			"/auth/register/shop",
			requestBody,
			"POST"
		);

		if (statusCode >= 400) {
			toast("エラーが発生しました", {
				id: toastId,
				icon: "🤦‍♂️",
			});
			return;
		}

		toast.success("ユーザー情報を登録しました", {
			duration: 1500,
			id: toastId,
			icon: "🙆‍♂️",
		});
		await new Promise((resolve) => setTimeout(resolve, 400));

		await saveSequreStore("access_token", response.token);
		await setShopInfo((prev) => ({
			...prev,
			isSignin: true,
		}));
	}, []);

	return (
		<AuthLayout>
			<Text style={textStyles.title}>お客様情報登録</Text>

			<Text
				lightTextColor={color}
				darkTextColor={color}
				style={textStyles.label}
			>
				店舗名
			</Text>
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

			<Text
				lightTextColor={color}
				darkTextColor={color}
				style={textStyles.label}
			>
				住所
			</Text>
			<Controller
				control={control}
				name="address"
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
			{errors.address && <ErrorMessage message={errors.address.message} />}

			<Text
				lightTextColor={color}
				darkTextColor={color}
				style={textStyles.label}
			>
				{shopInfo.email ? "電話番号" : "メールアドレス"}
			</Text>
			{shopInfo.email ? (
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
			) : (
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
			)}
			{errors.phone && <ErrorMessage message={errors.phone.message} />}
			{errors.email && <ErrorMessage message={errors.email.message} />}

			<ColorButton
				title="登録"
				outlineStyle={buttonStyles.outline}
				// eslint-disable-next-line react/jsx-handler-names
				onPress={handleSubmit(onSubmitPress)}
			/>
		</AuthLayout>
	);
};
