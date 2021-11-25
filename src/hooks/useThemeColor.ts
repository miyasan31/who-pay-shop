import { themes } from "src/constants/Colors";
import { useColorScheme } from "src/hooks/useColorScheme";

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
