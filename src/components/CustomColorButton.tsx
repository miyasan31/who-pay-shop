/* eslint-disable react/destructuring-assignment */
import type { VFC } from "react";
import React from "react";
import { StyleSheet, TouchableOpacity as NativeTouchableOpacity } from "react-native";
import type { TextProps } from "src/components/CustomText";
import { CustomText } from "src/components/CustomText";
import { CustomView } from "src/components/CustomView";
import type { ThemeProps } from "src/components/theme.type";
import { useThemeColor } from "src/hooks/useThemeColor";

export type ColorButtonProps = ThemeProps &
	TextProps &
	NativeTouchableOpacity["props"] & {
		title: string;
	};

export const CustomColorButton: VFC<ColorButtonProps> = (props) => {
	const {
		// TextProps,
		lightTextColor,
		darkTextColor,
		children,
		textStyle,
		title,
		// TouchableOpacityProps
		bgStyle,
		lightBgColor,
		darkBgColor,
		// ViewProps
		outlineStyle,
		onPress,
	} = props;

	const backgroundColor = useThemeColor({ light: lightBgColor, dark: darkBgColor }, "background");

	return (
		<CustomView style={[defaultStyles.outline, outlineStyle]}>
			<NativeTouchableOpacity
				style={[defaultStyles.bg, bgStyle, { backgroundColor }]}
				activeOpacity={0.4}
				onPress={onPress}
			>
				{children}
				<CustomText
					lightTextColor={lightTextColor}
					darkTextColor={darkTextColor}
					style={[defaultStyles.text, textStyle]}
				>
					{title}
				</CustomText>
			</NativeTouchableOpacity>
		</CustomView>
	);
};

const defaultStyles = StyleSheet.create({
	outline: {
		width: "80%",
	},
	bg: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",

		paddingVertical: 15,
		paddingHorizontal: 15,
		borderRadius: 9999,
	},
	text: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
	},
});
