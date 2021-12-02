/* eslint-disable react/destructuring-assignment */
import type { VFC } from "react";
import React from "react";
import {
	StyleSheet,
	TouchableOpacity as NativeTouchableOpacity,
} from "react-native";
import type { TextProps } from "src/components/CustomText";
import { CustomText } from "src/components/CustomText";
import { CustomView } from "src/components/CustomView";
import { useThemeColor } from "src/hooks";
import type { StyleProps } from "types/style";

export type ColorButtonProps = StyleProps &
	TextProps &
	NativeTouchableOpacity["props"] & {
		title?: string;
	};

export const CustomColorButton: VFC<ColorButtonProps> = (props) => {
	const {
		// TextProps
		title,
		children,
		textStyle,
		lightTextColor,
		darkTextColor,
		// TouchableOpacityProps
		bgStyle,
		lightBgColor,
		darkBgColor,
		// ViewProps
		outlineStyle,
		onPress,
	} = props;

	const backgroundColor = useThemeColor(
		{ light: lightBgColor, dark: darkBgColor },
		"primary"
	);

	const color = useThemeColor(
		{ light: lightTextColor, dark: darkTextColor },
		"text3"
	);

	return (
		<CustomView style={[defaultStyles.outline, outlineStyle]}>
			<NativeTouchableOpacity
				style={[defaultStyles.bg, bgStyle, { backgroundColor }]}
				activeOpacity={0.4}
				onPress={onPress}
			>
				{children}

				{title ? (
					<CustomText
						lightTextColor={color}
						darkTextColor={color}
						style={[defaultStyles.text, textStyle]}
					>
						{title}
					</CustomText>
				) : null}
			</NativeTouchableOpacity>
		</CustomView>
	);
};

const defaultStyles = StyleSheet.create({
	outline: {
		width: "100%",
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
