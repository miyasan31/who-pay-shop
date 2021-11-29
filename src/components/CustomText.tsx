/* eslint-disable react/destructuring-assignment */
import type { VFC } from "react";
import React from "react";
import { StyleSheet, Text as NativeText } from "react-native";
import type { ThemeProps } from "src/components/theme.type";
import { useThemeColor } from "src/hooks";

export type TextProps = ThemeProps & NativeText["props"];

export const CustomText: VFC<TextProps> = (props) => {
	const { style, lightTextColor, darkTextColor, ...otherProps } = props;

	const color = useThemeColor({ light: lightTextColor, dark: darkTextColor }, "text");

	return <NativeText style={[defaultStyles.text, style, { color }]} {...otherProps} />;
};

const defaultStyles = StyleSheet.create({
	text: { width: "100%", textAlign: "center" },
});
