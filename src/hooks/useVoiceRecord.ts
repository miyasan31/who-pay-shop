import { Audio } from "expo-av";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast/src/core/toast";
import type { PayScreenProps } from "types";

let recording = new Audio.Recording();

export const useVoiceRecord = (props: PayScreenProps<"VoiceRecord">) => {
  // レコーディング中
  const [isRecording, setisRecording] = useState<boolean>(false);
  // マイクの使用許可
  const [audioPerm, setAudioPerm] = useState<boolean>(false);
  // 録音データ保存先URI
  const [recordedURI, setRecordedURI] = useState("");

  // 録音開始
  const onStartRecording = useCallback(async () => {
    if (audioPerm) {
      try {
        await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        await recording.startAsync();

        setisRecording(true);
      } catch (error) {
        console.info(error);
      }
    } else {
      getPermission();
    }
  }, [audioPerm]);

  // 録音停止
  const onStopRecording = useCallback(async () => {
    try {
      const toastId = toast.loading("処理中...", {
        icon: "💁‍♂️",
      });

      // 録音を停止する
      await recording.stopAndUnloadAsync();

      // 録音データのURIを取得
      const result = recording.getURI();

      if (!result) {
        toast("エラーが発生しました", {
          id: toastId,
          icon: "🤦‍♂️",
        });
        return;
      }

      // 録音データのURIを保存
      setRecordedURI(result);

      toast("録音が完了しました", {
        id: toastId,
        icon: "🤦‍♂️",
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 録音用インスタンスを初期化
      recording = new Audio.Recording();
      // 録音状態をfalseにする
      setisRecording(false);

      const { amount } = props.route.params;
      props.navigation.replace("Passcode", {
        amount: amount,
        uri: result,
      });

      // props.navigation.navigate("VoiceRecordSettingSelect");
    } catch (error) {
      console.info(error);
    }
  }, [recordedURI]);

  // マイクの使用許可を取得
  const getPermission = useCallback(async () => {
    // マイクの使用を尋ねる
    const getAudioPerm = await Audio.requestPermissionsAsync();
    // iOSおよびAndroidでのオーディオエクスペリエンスをカスタマイズ
    await Audio.setAudioModeAsync({
      // iOSで記録を有効にするか
      allowsRecordingIOS: true,
      // iOSでエクスペリエンスのオーディオをサイレントモードで再生するか
      playsInSilentModeIOS: true,
    });
    setAudioPerm(getAudioPerm.granted);
  }, []);

  const onRecordingEvent = useMemo(() => {
    return isRecording ? onStopRecording : onStartRecording;
  }, [isRecording, onStartRecording, onStopRecording]);

  useEffect(() => {
    getPermission();
  }, []);

  return {
    isRecording,
    recordedURI,
    onRecordingEvent,
  };
};
