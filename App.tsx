import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useCachedResources } from "src/hooks/useCachedResources";
import { useColorScheme } from "src/hooks/useColorScheme";
import { Navigation } from "src/navigations";

const App = () => {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<SafeAreaProvider>
				<Navigation colorScheme={colorScheme} />
				<StatusBar />
			</SafeAreaProvider>
		);
	}
};

// eslint-disable-next-line import/no-default-export
export default App;
