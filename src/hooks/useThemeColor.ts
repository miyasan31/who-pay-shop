import { useColorScheme } from "src/hooks";
import { theme } from "src/styles";

export const useThemeColor = (
	themeProps: { light?: string; dark?: string },
	themeName: keyof typeof theme.light & keyof typeof theme.dark
) => {
	const themeColor = useColorScheme();
	const colorFromProps = themeProps[themeColor];

	if (colorFromProps) {
		return colorFromProps;
	} else {
		return theme[themeColor][themeName];
	}
};
