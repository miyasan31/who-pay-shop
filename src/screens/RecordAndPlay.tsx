/* eslint-disable react/jsx-handler-names */
import { Audio } from "expo-av";
import type { VFC } from "react";
import React, { useEffect, useRef, useState } from "react";
import { Button, StyleSheet } from "react-native";
import { Text, View } from "src/components";
import type { TabScreenProps } from "types";

let recording = new Audio.Recording();

export const RecordAndPlay: VFC<TabScreenProps<"TabThree">> = () => {
	const Player = useRef(new Audio.Sound());

	// 録音データ保存先
	const [RecordedURI, SetRecordedURI] = useState<string | null>("");
	// マイクの使用許可
	const [AudioPerm, SetAudioPerm] = useState<boolean>(false);
	// レコーディング中
	const [isRecording, SetisRecording] = useState<boolean>(false);
	// 再生中
	const [isPLaying, SetisPLaying] = useState<boolean>(false);

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

	const onPlaySound = async () => {
		try {
			const result = await Player.current.loadAsync({ uri: RecordedURI || "" }, {}, true);

			console.log(result);

			const response = await Player.current.getStatusAsync();

			if (response.isLoaded) {
				if (response.isPlaying === false) {
					Player.current.playAsync();
					SetisPLaying(true);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	const onStopSound = async () => {
		try {
			const checkLoading = await Player.current.getStatusAsync();
			if (checkLoading.isLoaded === true) {
				await Player.current.stopAsync();
				SetisPLaying(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>録音{"&"}再生画面</Text>
			<View style={styles.separator} lightBgColor="#eee" darkBgColor="rgba(255,255,255,0.1)" />
			<Button
				title={isRecording ? "録音終了" : "録音開始"}
				onPress={isRecording ? () => onStopRecording() : () => onStartRecording()}
			/>
			<Button title="再生" onPress={isPLaying ? () => onStopSound : () => onPlaySound()} />
			<Text>{RecordedURI}</Text>
		</View>
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
});
