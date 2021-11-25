/* eslint-disable react/destructuring-assignment */
import type { VFC } from "react";
import React from "react";
import { Button as NativeButton } from "react-native";
import type { ThemeProps } from "src/components/theme.type";
import { useThemeColor } from "src/hooks/useThemeColor";

export type ButtonProps = ThemeProps & NativeButton["props"];

export const CustomButton: VFC<ButtonProps> = (props) => {
	const { lightTextColor, darkTextColor, title, onPress, disabled, testID, accessibilityLabel, ...otherProps } = props;

	const textColor = useThemeColor({ light: lightTextColor, dark: darkTextColor }, "text");

	return (
		<NativeButton
			title={title}
			color={textColor}
			onPress={onPress}
			disabled={disabled}
			testID={testID}
			accessibilityLabel={accessibilityLabel}
			{...otherProps}
		/>
	);
};
