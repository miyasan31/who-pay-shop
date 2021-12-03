import type { VFC } from "react";
import React, { useCallback } from "react";
import { ColorButton, Text, View } from "src/components/custom";
import { buttonStyles, textStyles, viewStyles } from "src/styles";
import type { StackScreenProps } from "types";

export const ShopInfoVerificationScreen: VFC<
	StackScreenProps<"ShopInfoVerification">
> = (props) => {
	const { shopName, passcode, creditNumber, securityCode, email } =
		props.route.params;

	const onShopInfoRegister = useCallback(() => {
		const body = { ...props.route.params };
		console.info("POST Request Body", body);
		props.navigation.navigate("Calculator");
	}, [props]);

	const onStackBack = useCallback(() => {
		props.navigation.goBack();
	}, [props]);

	return (
		<View style={viewStyles.semi}>
			<Text style={textStyles.title}>新規登録確認画面</Text>

			<Text style={textStyles.label}>店舗名</Text>
			<Text style={textStyles.text}>{shopName}</Text>

			<Text style={textStyles.label}>４桁のパスコード</Text>
			<Text style={textStyles.text}>{passcode}</Text>

			<Text style={textStyles.label}>クレジットカード番号</Text>
			<Text style={textStyles.text}>{creditNumber}</Text>

			<Text style={textStyles.label}>セキュリティコード</Text>
			<Text style={textStyles.text}>{securityCode}</Text>

			<Text style={textStyles.label}>メールアドレス</Text>
			<Text style={textStyles.text}>{email}</Text>

			<ColorButton
				title="登録"
				outlineStyle={buttonStyles.outline}
				onPress={onShopInfoRegister}
			/>
			<ColorButton
				title="入力画面に戻る"
				lightBgColor="#bfbfbf"
				darkBgColor="#bfbfbf84"
				outlineStyle={buttonStyles.outline}
				onPress={onStackBack}
			/>
		</View>
	);
};
