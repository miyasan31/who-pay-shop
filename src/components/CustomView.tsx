/* eslint-disable react/destructuring-assignment */
import type { VFC } from "react";
import React from "react";
import { View as NativeView } from "react-native";
import type { ThemeProps } from "src/components/theme.type";
import { useThemeColor } from "src/hooks";

export type ViewProps = ThemeProps & NativeView["props"];

export const CustomView: VFC<ViewProps> = (props) => {
	const { style, lightBgColor, darkBgColor, ...otherProps } = props;

	const backgroundColor = useThemeColor({ light: lightBgColor, dark: darkBgColor }, "background");

	return <NativeView style={[style, { backgroundColor }]} {...otherProps} />;
};
