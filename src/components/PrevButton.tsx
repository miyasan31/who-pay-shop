import { MaterialIcons } from "@expo/vector-icons";
import type { VFC } from "react";
import React, { useCallback } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text } from "src/components/custom";
import { useThemeColor } from "src/hooks";
import type {
	AccountScreenProps,
	MainScreenProps,
	PaymentScreenProps,
	SettingScreenProps,
} from "types";

type Option =
	| MainScreenProps<"Setting">
	| SettingScreenProps<"SettingSelect" | "Payment">
	| PaymentScreenProps<"PaymentList" | "PaymentDetail">
	| AccountScreenProps<"Account" | "AccountUpdate">;
type PrevProps = Option & {
	screen: "SettingSelect" | "PaymentList" | "Account";
};

export const PrevButton: VFC<PrevProps> = (props) => {
	const icon1 = useThemeColor({}, "icon1");

	const onPrevScreen = useCallback((navigation) => {
		navigation.navigate(props.screen);
	}, []);

	return (
		<Pressable
			onPress={() => onPrevScreen(props.navigation)}
			style={({ pressed }) => [{ opacity: pressed ? 0.4 : 1 }, styles.prev]}
		>
			<MaterialIcons name="keyboard-arrow-left" size={24} color={icon1} />
			<Text
				style={styles.buttonLabel}
				lightTextColor={icon1}
				darkTextColor={icon1}
			>
				戻る
			</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	buttonLabel: {
		fontWeight: "400",
	},
	prev: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",

		width: 40,
		marginLeft: 20,
	},
});
