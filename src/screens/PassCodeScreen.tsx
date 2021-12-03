import { Ionicons } from "@expo/vector-icons";
import type { VFC } from "react";
import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { PassCodeKeyButton } from "src/components";
import { ColorButton, Text, View } from "src/components/custom";
import { useThemeColor } from "src/hooks";
import { buttonStyles, textStyles, viewStyles } from "src/styles";
import type { StackScreenProps } from "types";

export const PassCodeScreen: VFC<StackScreenProps<"PassCode">> = (props) => {
	const { price } = props.route.params;
	const color = useThemeColor({}, "text2");
	const backGroundColor = useThemeColor({}, "bg1");
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
		<View style={viewStyles.middle}>
			<Text style={textStyles.passCodeTitle}>パスワードを入力してください</Text>

			<View
				lightBgColor={backGroundColor}
				darkBgColor={backGroundColor}
				style={styles.priceArea}
			>
				<Text style={styles.priceText}>{secretView(passcode)}</Text>
			</View>

			<View style={styles.keyRow}>
				<PassCodeKeyButton title="1" onPress={onClick} />
				<PassCodeKeyButton title="2" onPress={onClick} />
				<PassCodeKeyButton title="3" onPress={onClick} />
			</View>
			<View style={styles.keyRow}>
				<PassCodeKeyButton title="4" onPress={onClick} />
				<PassCodeKeyButton title="5" onPress={onClick} />
				<PassCodeKeyButton title="6" onPress={onClick} />
			</View>
			<View style={styles.keyRow}>
				<PassCodeKeyButton title="7" onPress={onClick} />
				<PassCodeKeyButton title="8" onPress={onClick} />
				<PassCodeKeyButton title="9" onPress={onClick} />
			</View>
			<View style={styles.keyRow}>
				<View style={styles.keyOutline}></View>

				<PassCodeKeyButton title="0" onPress={onClick} />
				<PassCodeKeyButton onPress={onDelete}>
					<Ionicons name="backspace" size={40} color={color} />
				</PassCodeKeyButton>
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
		height: 60,
		marginBottom: 32,
	},
	priceText: {
		flex: 1,
		fontSize: 40,
		fontWeight: "bold",
		textAlign: "center",
		letterSpacing: 8,
	},

	keyRow: {
		display: "flex",
		flexDirection: "row",
		marginBottom: 15,
	},
	keyOutline: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: "33%",
		opacity: 0,
	},
	deleteKey: {
		borderColor: "#ffffff00",
	},
});
