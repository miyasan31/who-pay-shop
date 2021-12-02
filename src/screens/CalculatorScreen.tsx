import { Feather, Ionicons } from "@expo/vector-icons";
import type { VFC } from "react";
import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { KeyButton } from "src/components";
import { ColorButton, Text, View } from "src/components/custom";
import { useThemeColor } from "src/hooks";
import { buttonStyles, textStyles, viewStyles } from "src/styles";
import type { StackScreenProps } from "types";

const formatter = new Intl.NumberFormat("ja-JP");

export const CalculatorScreen: VFC<StackScreenProps<"Calculator">> = (
	props
) => {
	const icon1 = useThemeColor({}, "icon1");
	const color = useThemeColor({}, "text2");
	const backGroundColor = useThemeColor({}, "bg2");
	const [price, setPrice] = useState("");

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

	const onVoiceAuthentication = useCallback((price: string) => {
		props.navigation.navigate("VoiceRecord", { price: price });
	}, []);

	return (
		<View style={viewStyles.full}>
			<Text style={textStyles.title}>お支払い金額を入力</Text>

			<View
				lightBgColor={backGroundColor}
				darkBgColor={backGroundColor}
				style={styles.priceArea}
			>
				<Feather name="x-circle" size={30} color={icon1} onPress={onClear} />
				<Text style={styles.yensign}>¥</Text>
				<Text style={styles.priceText}>{formatter.format(Number(price))}</Text>
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
		</View>
	);
};

const styles = StyleSheet.create({
	priceArea: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-evenly",
		width: "100%",
		paddingHorizontal: 25,
		height: 100,
		marginBottom: 5,
		borderTopWidth: 1,
		borderTopColor: "#bababa",
	},
	yensign: {
		flex: 2,
		paddingLeft: 20,
		fontSize: 40,
		fontWeight: "bold",
	},
	priceText: {
		flex: 10,
		fontSize: 30,
		fontWeight: "bold",
		textAlign: "right",
	},

	keyRow: {
		display: "flex",
		flexDirection: "row",
		marginBottom: 5,
	},
});
