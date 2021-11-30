import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import type { VFC } from "react";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ColorButton, Text, View } from "src/components";
import type { StackScreenProps } from "types";

let recording = new Audio.Recording();

export const RecordScreen: VFC<StackScreenProps<"Record">> = (props) => {
	const { price } = props.route.params;
	// const Player = useRef(new Audio.Sound());

	// 録音データ保存先
	const [RecordedURI, SetRecordedURI] = useState<string | null>("");
	// マイクの使用許可
	const [AudioPerm, SetAudioPerm] = useState<boolean>(false);
	// レコーディング中
	const [isRecording, SetisRecording] = useState<boolean>(false);
	// 再生中
	// const [isPLaying, SetisPLaying] = useState<boolean>(false);

	const getPermission = async () => {
		// マイクの使用を尋ねる
		const getAudioPerm = await Audio.requestPermissionsAsync();
		// iOSおよびAndroidでのオーディオエクスペリエンスをカスタマイズ
		await Audio.setAudioModeAsync({
			// iOSで記録を有効にするか
			allowsRecordingIOS: true,
			// iOSでエクスペリエンスのオーディオをサイレントモードで再生するか
			playsInSilentModeIOS: true,
		});
		SetAudioPerm(getAudioPerm.granted);
	};

	useEffect(() => {
		getPermission();
	}, []);

	const onStartRecording = async () => {
		if (AudioPerm === true) {
			try {
				await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
				await recording.startAsync();
				SetisRecording(true);
			} catch (error) {
				console.log(error);
			}
		} else {
			getPermission();
		}
	};

	const onStopRecording = async () => {
		try {
			await recording.stopAndUnloadAsync();
			const result = recording.getURI();
			SetRecordedURI(result); // Here is the URI
			recording = new Audio.Recording();
			SetisRecording(false);
		} catch (error) {
			console.log(error);
		}
	};

	const onVoiceAuthentication = useCallback((price: string) => {
		props.navigation.navigate("Record", { price: price });
	}, []);

	return (
		<View style={styles.container}>
			{!RecordedURI ? (
				<>
					<Text style={styles.text}>「フーペイ」</Text>
					<Text style={styles.subText}>と言ってください</Text>

					<MaterialIcons
						name={isRecording ? "settings-voice" : "keyboard-voice"}
						size={150}
						color="black"
						// eslint-disable-next-line react/jsx-handler-names
						onPress={isRecording ? () => onStopRecording() : () => onStartRecording()}
					/>
					<Text style={styles.subText}>発言するときはマイクボタンを長押ししてください</Text>
				</>
			) : (
				<>
					<AntDesign name="checkcircleo" size={100} color="black" />

					<Text style={styles.subText}>本人確認が完了しました</Text>

					<ColorButton
						title="暗証番号入力へ"
						textStyle={buttonStyles.text}
						bgStyle={buttonStyles.button}
						outlineStyle={buttonStyles.outline}
						onPress={() => onVoiceAuthentication(price)}
					/>
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		paddingBottom: 10,
		fontSize: 35,
		fontWeight: "bold",
	},
	subText: {
		fontSize: 20,
		width: "80%",
	},
});

export const buttonStyles = StyleSheet.create({
	outline: { marginTop: 20, width: "80%" },
	text: {},
	button: {},
	register: {
		paddingVertical: 15,
		textAlign: "right",
	},
});
