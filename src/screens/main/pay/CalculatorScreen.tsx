import { Feather, Ionicons } from "@expo/vector-icons";
import type { VFC } from "react";
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { KeyButton } from "src/components";
import { ColorButton, Text, View } from "src/components/custom";
import { Layout } from "src/components/layout";
import { useThemeColor } from "src/hooks";
import { buttonStyles, textStyles } from "src/styles";
import type { PayScreenProps } from "types";

const formatter = new Intl.NumberFormat("ja-JP");

export const CalculatorScreen: VFC<PayScreenProps<"Calculator">> = (props) => {
	const icon1 = useThemeColor({}, "icon1");
	const color = useThemeColor({}, "text2");
	const backGroundColor = useThemeColor({}, "bg1");
	const [price, setPrice] = useState("");

	const priceText = useMemo(() => {
		return formatter.format(Number(price));
	}, [price]);

	const onClick = useCallback((number?: string) => {
		setPrice((prevPrice) => {
			if (prevPrice.length === 10) return prevPrice;
			if (number && prevPrice === "" && ["0", "00"].includes(number)) return "";
			return prevPrice + number;
		});
	}, []);

	const onDelete = useCallback(() => {
		setPrice((prevPrice) => prevPrice.slice(0, -1));
	}, []);

	const onClear = useCallback(() => {
		setPrice("");
	}, []);

	const onVoiceAuthentication = useCallback(async (price: string) => {
		props.navigation.navigate("VoiceRecord", { price: price });
	}, []);

	return (
		<Layout>
			<Text style={textStyles.messageTitle}>お支払い金額を入力</Text>

			<View
				lightBgColor={backGroundColor}
				darkBgColor={backGroundColor}
				style={styles.priceArea}
			>
				<Text style={styles.yensign}>¥</Text>
				<Text style={styles.priceText}>{priceText}</Text>
				<Feather name="x-circle" size={30} color={icon1} onPress={onClear} />
			</View>

			<View style={styles.keyRow}>
				<KeyButton title="7" onPress={onClick} />
				<KeyButton title="8" onPress={onClick} />
				<KeyButton title="9" onPress={onClick} />
			</View>
			<View style={styles.keyRow}>
				<KeyButton title="4" onPress={onClick} />
				<KeyButton title="5" onPress={onClick} />
				<KeyButton title="6" onPress={onClick} />
			</View>
			<View style={styles.keyRow}>
				<KeyButton title="1" onPress={onClick} />
				<KeyButton title="2" onPress={onClick} />
				<KeyButton title="3" onPress={onClick} />
			</View>
			<View style={styles.keyRow}>
				<KeyButton title="0" onPress={onClick} />
				<KeyButton title="00" onPress={onClick} />
				<KeyButton onPress={onDelete}>
					<Ionicons name="backspace" size={40} color={color} />
				</KeyButton>
			</View>

			<ColorButton
				title="音声確認へ"
				outlineStyle={[buttonStyles.outline, buttonStyles.semi]}
				onPress={() => onVoiceAuthentication(price)}
			/>
		</Layout>
	);
};

const styles = StyleSheet.create({
	priceArea: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-evenly",
		width: "100%",
		paddingHorizontal: 25,
		height: 50,
		marginBottom: 30,
		borderBottomWidth: 1,
		borderBottomColor: "#bababa",
	},
	yensign: {
		flex: 2,
		fontSize: 40,
		fontWeight: "bold",
	},
	priceText: {
		flex: 10,
		fontSize: 30,
		paddingRight: 20,
		fontWeight: "bold",
		textAlign: "right",
	},

	keyRow: {
		display: "flex",
		flexDirection: "row",
		marginBottom: 5,
	},
});