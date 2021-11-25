/* eslint-disable react/destructuring-assignment */
import type { VFC } from "react";
import React from "react";
import { StyleSheet, TextInput as NativeTextInput } from "react-native";
import type { ViewProps } from "src/components/CustomView";
import { CustomView } from "src/components/CustomView";
import type { ThemeProps } from "src/components/theme.type";
import { useThemeColor } from "src/hooks/useThemeColor";

export type TextInputProps = ThemeProps & ViewProps & NativeTextInput["props"];

export const CustomTextInput: VFC<TextInputProps> = (props) => {
	const { textStyle, lightTextColor, darkTextColor, bgStyle, ...otherProps } = props;

	const color = useThemeColor({ light: lightTextColor, dark: darkTextColor }, "text");

	return (
		<CustomView style={[defaultStyles.bg, bgStyle]} lightBgColor="#eeeeeeaa" darkBgColor="#354355aa">
			<NativeTextInput style={[textStyle, { color }]} {...otherProps} />
		</CustomView>
	);
};

const defaultStyles = StyleSheet.create({
	bg: {
		width: "80%",
		padding: 10,

		// borderWidth: 2,
		// borderColor: "#87878754",
	},
});
