import { Feather, Ionicons } from "@expo/vector-icons";
import type { VFC } from "react";
import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { KeyButton } from "src/components";
import { ColorButton, Text, View } from "src/components/custom";
import { useThemeColor } from "src/hooks";
import { buttonStyles, textStyles, viewStyles } from "src/styles";
import type { StackScreenProps } from "types";

export const PassCodeScreen: VFC<StackScreenProps<"PassCode">> = (props) => {
	const { price } = props.route.params;
	const color = useThemeColor({}, "text2");
	const backGroundColor = useThemeColor({}, "bg2");
	const icon1 = useThemeColor({}, "icon1");
	const [passcode, setPasscode] = useState("");

	const onClick = useCallback((number?: string) => {
		setPasscode((prevPrice) => {
			if (prevPrice.length === 4) return prevPrice;
			if (number && prevPrice === "" && ["00"].includes(number)) return "";
			return prevPrice + number;
		});
	}, []);

	const onDelete = useCallback(() => {
		setPasscode((prevPrice) => prevPrice.slice(0, -1));
	}, []);

	const onClear = useCallback(() => {
		setPasscode("");
	}, []);

	const onVoiceAuthentication = useCallback(
		(price: string, passcode: string) => {
			const body = { price: price, passcode: passcode };
			console.info("POST Request Body", body);
			props.navigation.navigate("Calculator");
		},
		[]
	);

	const secretView = useCallback((passcode: string) => {
		const length = passcode.length;
		return "●".repeat(length);
	}, []);

	return (
		<View style={viewStyles.full}>
			<Text style={textStyles.title}>パスワードを入力してください</Text>

			<View
				lightBgColor={backGroundColor}
				darkBgColor={backGroundColor}
				style={styles.priceArea}
			>
				<Feather name="x-circle" size={30} color={icon1} onPress={onClear} />
				<Text style={styles.priceText}>{secretView(passcode)}</Text>
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
				title="送信"
				outlineStyle={[buttonStyles.outline, buttonStyles.semi]}
				onPress={() => onVoiceAuthentication(price, passcode)}
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
	priceText: {
		flex: 1,
		fontSize: 40,
		fontWeight: "bold",
		textAlign: "center",
		paddingRight: 30,
	},

	keyRow: {
		display: "flex",
		flexDirection: "row",
		marginBottom: 5,
	},
});
