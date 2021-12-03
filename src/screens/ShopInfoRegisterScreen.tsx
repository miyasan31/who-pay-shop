import type { VFC } from "react";
import React, { useCallback, useState } from "react";
import { ColorButton, Text, TextInput, View } from "src/components/custom";
import {
	buttonStyles,
	textInputStyles,
	textStyles,
	viewStyles,
} from "src/styles";
import type { StackScreenProps } from "types";

export const ShopInfoRegisterScreen: VFC<StackScreenProps<"ShopInfoRegister">> =
	(props) => {
		const { phone } = props.route.params;
		const [body, setBody] = useState({
			shopName: "",
			passcode: "",
			creditNumber: "",
			securityCode: "",
			email: "",
		});

		const onChangeText = useCallback((key: string, value: string) => {
			setBody((prev) => ({
				...prev,
				[key]: value,
			}));
		}, []);

		const onShopInfoRegister = useCallback(() => {
			props.navigation.navigate("ShopInfoVerification", {
				...body,
				phone: phone,
			});
		}, [props, body, phone]);

		return (
			<View style={viewStyles.semi}>
				<Text style={textStyles.title}>店舗情報登録</Text>

				<Text style={textStyles.label}>店舗名</Text>
				<TextInput
					bgStyle={textInputStyles.bg}
					onChangeText={(text: string) => onChangeText("shopName", text)}
					value={body.shopName}
					placeholder=""
				/>

				<Text style={textStyles.label}>４桁のパスコード</Text>
				<TextInput
					bgStyle={textInputStyles.bg}
					onChangeText={(text: string) => onChangeText("passcode", text)}
					value={body.passcode}
					placeholder=""
				/>

				<Text style={textStyles.label}>クレジットカード番号</Text>
				<TextInput
					bgStyle={textInputStyles.bg}
					onChangeText={(text: string) => onChangeText("creditNumber", text)}
					value={body.creditNumber}
					placeholder=""
				/>

				<Text style={textStyles.label}>セキュリティコード</Text>
				<TextInput
					bgStyle={textInputStyles.bg}
					onChangeText={(text: string) => onChangeText("securityCode", text)}
					value={body.securityCode}
					placeholder=""
				/>

				<Text style={textStyles.label}>メールアドレス</Text>
				<TextInput
					bgStyle={textInputStyles.bg}
					onChangeText={(text: string) => onChangeText("email", text)}
					value={body.email}
					placeholder=""
				/>

				<ColorButton
					title="登録"
					outlineStyle={buttonStyles.outline}
					onPress={onShopInfoRegister}
				/>
			</View>
		);
	};
