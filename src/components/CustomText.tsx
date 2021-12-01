/* eslint-disable react/destructuring-assignment */
import type { VFC } from "react";
import React from "react";
import { StyleSheet, Text as NativeText } from "react-native";
import { useThemeColor } from "src/hooks";
import type { StyleProps } from "types/style";

export type TextProps = StyleProps & NativeText["props"];

export const CustomText: VFC<TextProps> = (props) => {
	const { style, lightTextColor, darkTextColor, ...otherProps } = props;

	const color = useThemeColor(
		{ light: lightTextColor, dark: darkTextColor },
		"text1"
	);

	return (
		<NativeText
			style={[defaultStyles.text, style, { color }]}
			{...otherProps}
		/>
	);
};

const defaultStyles = StyleSheet.create({
	text: {
		width: "100%",
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
	},
});
