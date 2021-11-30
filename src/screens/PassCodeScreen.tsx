import { Feather, Ionicons } from "@expo/vector-icons";
import type { VFC } from "react";
import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { ColorButton, Text, View } from "src/components";
import { useThemeColor } from "src/hooks";
import { buttonStyles, viewStyles } from "src/styles";
import type { StackScreenProps } from "types";

const formatter = new Intl.NumberFormat("ja-JP");

export const PassCodeScreen: VFC<StackScreenProps<"PassCode">> = (props) => {
	const color = useThemeColor({}, "text2");
	const backGroundColor = useThemeColor({}, "bg2");
	const icon1 = useThemeColor({}, "icon1");
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
		props.navigation.navigate("Record", { price: price });
	}, []);

	return (
		<View style={viewStyles.full}>
			<Text style={styles.title}>支払い金額</Text>

			<View lightBgColor={backGroundColor} darkBgColor={backGroundColor} style={styles.priceArea}>
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
				textStyle={buttonStyles.text}
				bgStyle={buttonStyles.button}
				outlineStyle={[buttonStyles.outline, buttonStyles.semi]}
				onPress={() => onVoiceAuthentication(price)}
			/>
		</View>
	);
};

type Porps = {
	title?: string;
	children?: React.ReactNode;
	onPress: (number?: string) => void;
};

const KeyButton: VFC<Porps> = (props) => {
	const color = useThemeColor({}, "text1");
	const backGroundColor = useThemeColor({}, "bg2");
	return (
		<ColorButton
			lightTextColor={color}
			darkTextColor={color}
			lightBgColor={backGroundColor}
			darkBgColor={backGroundColor}
			outlineStyle={styles.keyOutline}
			bgStyle={styles.keyBg}
			textStyle={styles.keyText}
			title={props.title}
			onPress={() => (props.title ? props.onPress(props.title) : props.onPress())}
		>
			{props.children}
		</ColorButton>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 25,
		fontWeight: "bold",
		textAlign: "center",
		paddingVertical: 25,
	},

	priceArea: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-evenly",
		width: "100%",
		padding: 25,
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
	keyOutline: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: "33%",
	},
	keyBg: {
		width: "96%",
		height: 90,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 5,
	},
	keyText: {
		fontSize: 30,
	},
});
