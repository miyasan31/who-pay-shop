import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { VFC } from "react";
import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { ColorButton, Text, View } from "src/components";
import type { ScreenProp } from "types";

export const CalculatorScreen: VFC<ScreenProp> = () => {
	const navigation = useNavigation<ScreenProp>();
	const [price, setPrice] = useState("");

	const onClick = useCallback((number: string) => {
		setPrice((prevPrice) => prevPrice + number);
	}, []);

	const onDelete = useCallback(() => {
		setPrice((prevPrice) => prevPrice.slice(0, -1));
	}, []);

	const onVoiceAuthentication = useCallback((price: string) => {
		navigation.navigate("Record", { price: price });
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>支払い金額</Text>

			<View lightBgColor="#eeeeeeaa" darkBgColor="#354355aa" style={styles.priceArea}>
				<Text style={styles.yensign}>¥</Text>
				<Text style={styles.priceNumber}>{price}</Text>
			</View>

			<View style={styles.row}>
				<ColorButton outlineStyle={styles.key} title="7" onPress={() => onClick("7")} />
				<ColorButton outlineStyle={styles.key} title="8" onPress={() => onClick("8")} />
				<ColorButton outlineStyle={styles.key} title="9" onPress={() => onClick("9")} />
			</View>
			<View style={styles.row}>
				<ColorButton outlineStyle={styles.key} title="4" onPress={() => onClick("4")} />
				<ColorButton outlineStyle={styles.key} title="5" onPress={() => onClick("5")} />
				<ColorButton outlineStyle={styles.key} title="6" onPress={() => onClick("6")} />
			</View>
			<View style={styles.row}>
				<ColorButton outlineStyle={styles.key} title="1" onPress={() => onClick("1")} />
				<ColorButton outlineStyle={styles.key} title="2" onPress={() => onClick("2")} />
				<ColorButton outlineStyle={styles.key} title="3" onPress={() => onClick("3")} />
			</View>
			<View style={styles.row}>
				<ColorButton outlineStyle={styles.key} title="0" onPress={() => onClick("0")} />
				<ColorButton outlineStyle={styles.key} title="00" onPress={() => onClick("00")} />
				<ColorButton outlineStyle={styles.key} onPress={onDelete}>
					<Ionicons name="backspace" size={40} color="#656565" />
				</ColorButton>
			</View>

			<ColorButton
				textStyle={buttonStyles.text}
				lightTextColor="#ffffff"
				darkTextColor="#ffffff"
				bgStyle={buttonStyles.button}
				lightBgColor="#00e8bd"
				darkBgColor="#00cba6"
				outlineStyle={buttonStyles.outline}
				title="音声確認へ"
				onPress={() => onVoiceAuthentication(price)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 25,
		fontWeight: "bold",
		textAlign: "center",
		paddingVertical: 20,
	},
	row: {
		display: "flex",
		flexDirection: "row",
	},
	key: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: "30%",
		backgroundColor: "gray",
	},
	priceArea: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-evenly",
		padding: 25,
		width: "100%",
	},
	yensign: {
		flex: 1,
		paddingHorizontal: 20,
		fontSize: 35,
		fontWeight: "bold",
	},
	priceNumber: {
		flex: 9,
		fontSize: 30,
		fontWeight: "bold",
		textAlign: "center",
	},
	button: {},
});

export const buttonStyles = StyleSheet.create({
	outline: { marginTop: 20, width: "80%" },
	text: {},
	button: {},
	register: {
		paddingVertical: 15,
		textAlign: "right",
	},
});
