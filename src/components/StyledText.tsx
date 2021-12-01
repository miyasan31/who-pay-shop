import React from "react";
import { Text } from "src/components";
import type { TextProps } from "src/components/CustomText";

export const MonoText = (props: TextProps) => {
	return (
		<Text {...props} style={[props.style, { fontFamily: "space-mono" }]} />
	);
};
