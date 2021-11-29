import { themes } from "src/constants";
import { useColorScheme } from "src/hooks";

export const useThemeColor = (
	props: { light?: string; dark?: string },
	colorName: keyof typeof themes.light & keyof typeof themes.dark
) => {
	const theme = useColorScheme();
	const colorFromProps = props[theme];

	if (colorFromProps) {
		return colorFromProps;
	} else {
		return themes[theme][colorName];
	}
};
