import type { VFC } from "react";
import React, { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { shop } from "src/atom";
import { ColorButton, Text, View } from "src/components/custom";
import { authRequestFetcher } from "src/functions/fetcher";
import { buttonStyles, textStyles, viewStyles } from "src/styles";
import type { AuthScreenProps } from "types";

export const ShopInfoVerificationScreen: VFC<
	AuthScreenProps<"ShopInfoVerification">
> = (props) => {
	const { shopName, address, email } = props.route.params;
	const setShopInfo = useSetRecoilState(shop);

	const onShopInfoRegister = useCallback(async () => {
		const body = { ...props.route.params };
		const result = await authRequestFetcher("/user", body, "POST");
		if (result.status >= 400) {
			console.info("不正なリクエスト");
			return;
		}
		setShopInfo((prev) => ({
			...prev,
			id: result.id,
			shopName: body.shopName,
			email: body.email,
			phone: body.phone,
			isSignin: true,
		}));
	}, [props]);

	const onStackBack = useCallback(() => {
		props.navigation.goBack();
	}, [props]);

	return (
		<View style={viewStyles.semi}>
			<Text style={textStyles.title}>新規登録確認画面</Text>

			<Text style={textStyles.label}>店舗名</Text>
			<Text style={textStyles.text}>{shopName}</Text>

			<Text style={textStyles.label}>住所</Text>
			<Text style={textStyles.text}>{address}</Text>

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
