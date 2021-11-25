import type { StyleProp, TextStyle, ViewStyle } from "react-native";

export type ThemeProps = {
	lightTextColor?: string;
	darkTextColor?: string;
	textStyle?: StyleProp<TextStyle>;

	lightBgColor?: string;
	darkBgColor?: string;
	bgStyle?: StyleProp<ViewStyle>;

	outlineStyle?: StyleProp<ViewStyle>;
};
