import type { VFC } from "react";
import React, { useCallback, useState } from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Text, TextInput, View } from "src/components";
import { onKeyBoardClose } from "src/functions";
import type { TabScreenProps } from "types";

// TabOneScreenの画面
export const TextInputScreen: VFC<TabScreenProps<"TabOne">> = () => {
	const [state, setState] = useState("");

	const onChangeText = useCallback((text) => {
		setState(text);
	}, []);

	return (
		<>
			<TouchableWithoutFeedback onPress={onKeyBoardClose}>
				<View style={styles.container}>
					<Text style={styles.title}>テキスト入力</Text>

					<View style={styles.separator} lightBgColor="#eee" darkBgColor="rgba(255,255,255,0.1)" />

					<TextInput
						bgStyle={styles.inputWrap}
						onChangeText={(text) => onChangeText(text)}
						value={state}
						placeholder="電話番号入力"
					/>
				</View>
			</TouchableWithoutFeedback>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
	inputWrap: {
		minWidth: "80%",
		padding: 10,
		borderRadius: 10,
	},
});
