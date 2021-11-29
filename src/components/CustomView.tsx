/* eslint-disable react/destructuring-assignment */
import type { VFC } from "react";
import React from "react";
import { View as NativeView } from "react-native";
import { useThemeColor } from "src/hooks";
import type { StyleProps } from "types/style";

export type ViewProps = StyleProps & NativeView["props"];

export const CustomView: VFC<ViewProps> = (props) => {
	const { style, lightBgColor, darkBgColor, ...otherProps } = props;

	const backgroundColor = useThemeColor({ light: lightBgColor, dark: darkBgColor }, "background");

	return <NativeView style={[style, { backgroundColor }]} {...otherProps} />;
};
