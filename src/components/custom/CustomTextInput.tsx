/* eslint-disable react/destructuring-assignment */
import type { VFC } from "react";
import React from "react";
import { StyleSheet, TextInput as NativeTextInput } from "react-native";
import type { ViewProps } from "src/components/custom";
import { View } from "src/components/custom";
import { useThemeColor } from "src/hooks";
import type { StyleProps } from "types/style";

export type TextInputProps = StyleProps & ViewProps & NativeTextInput["props"];

export const CustomTextInput: VFC<TextInputProps> = (props) => {
	const {
		textStyle,
		lightTextColor,
		darkTextColor,
		lightBgColor,
		darkBgColor,
		bgStyle,
		...otherProps
	} = props;

	const color = useThemeColor(
		{ light: lightTextColor, dark: darkTextColor },
		"text1"
	);
	const backgroundColor = useThemeColor(
		{ light: lightBgColor, dark: darkBgColor },
		"bg2"
	);

	return (
		<View
			style={[defaultStyles.bg, bgStyle]}
			lightBgColor={backgroundColor}
			darkBgColor={backgroundColor}
		>
			<NativeTextInput style={[textStyle, { color }]} {...otherProps} />
		</View>
	);
};

const defaultStyles = StyleSheet.create({
	bg: {
		width: "100%",
		padding: 10,

		// borderWidth: 2,
		// borderColor: "#87878754",
	},
});
