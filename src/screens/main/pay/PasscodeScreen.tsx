import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import type { VFC } from "react";
import React, { useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast/src/core/toast";
import { StyleSheet } from "react-native";
import { useRecoilValue } from "recoil";
import { shop } from "src/atoms";
import { CircleKeyButton } from "src/components";
import { ColorButton, Text, View } from "src/components/custom";
import { Layout } from "src/components/layout";
import { requestFetcher } from "src/functions/fetcher";
import { useThemeColor } from "src/hooks";
import { buttonStyles, textStyles } from "src/styles";
import type { PayScreenProps } from "types";

export const PasscodeScreen: VFC<PayScreenProps<"Passcode">> = (props) => {
  const color = useThemeColor({}, "text2");
  const backGroundColor = useThemeColor({}, "bg1");
  const shopInfo = useRecoilValue(shop);
  const [passcode, setPasscode] = useState("");

  const secretView = useMemo(() => {
    const length = passcode.length;
    return "●".repeat(length);
  }, [passcode]);

  const onClick = useCallback((number?: string) => {
    setPasscode((prevPrice) => {
      if (prevPrice.length === 4) return prevPrice;
      if (number && prevPrice === "" && ["00"].includes(number)) return "";
      return prevPrice + number;
    });
  }, []);

  const onDelete = useCallback(() => {
    setPasscode((prevPrice) => prevPrice.slice(0, -1));
  }, []);

  const onVoiceAuthentication = useCallback(async () => {
    const { amount, uri } = props.route.params;

    const toastId = toast.loading("処理中...", {
      icon: "💁‍♂️",
    });

    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: "base64",
    });

    const requestBody = {
      shopId: shopInfo.id,
      amount: amount,
      passcode: passcode,
      voiceFile: base64,
    };

    const { statusCode } = await requestFetcher("/payment", requestBody, "POST");

    console.info(statusCode);

    if (statusCode >= 400) {
      toast("エラーが発生しました", {
        id: toastId,
        icon: "🤦‍♂️",
      });
      setPasscode("");
      return;
    }

    toast("お支払いが完了しました", {
      id: toastId,
      icon: "🤦‍♂️",
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));

    props.navigation.replace("Calculator");
  }, [props, passcode, shopInfo]);

  return (
    <Layout>
      <Text style={textStyles.passCodeTitle}>パスワードを入力してください</Text>

      <View lightBgColor={backGroundColor} darkBgColor={backGroundColor} style={styles.priceArea}>
        <Text style={styles.priceText}>{secretView}</Text>
      </View>

      <View style={styles.keyRow}>
        <CircleKeyButton title="1" onPress={onClick} />
        <CircleKeyButton title="2" onPress={onClick} />
        <CircleKeyButton title="3" onPress={onClick} />
      </View>
      <View style={styles.keyRow}>
        <CircleKeyButton title="4" onPress={onClick} />
        <CircleKeyButton title="5" onPress={onClick} />
        <CircleKeyButton title="6" onPress={onClick} />
      </View>
      <View style={styles.keyRow}>
        <CircleKeyButton title="7" onPress={onClick} />
        <CircleKeyButton title="8" onPress={onClick} />
        <CircleKeyButton title="9" onPress={onClick} />
      </View>
      <View style={styles.keyRow}>
        <View style={styles.keyOutline}></View>

        <CircleKeyButton title="0" onPress={onClick} />
        <CircleKeyButton onPress={onDelete}>
          <Ionicons name="backspace" size={40} color={color} />
        </CircleKeyButton>
      </View>

      <ColorButton
        title="お支払い"
        outlineStyle={[buttonStyles.outline, buttonStyles.semi]}
        onPress={onVoiceAuthentication}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  priceArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    paddingHorizontal: 25,
    height: 60,
    marginBottom: 32,
  },
  priceText: {
    flex: 1,
    fontSize: 40,
    paddingLeft: 10,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 8,
  },

  keyRow: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 15,
  },
  keyOutline: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "33%",
    opacity: 0,
  },
  deleteKey: {
    borderColor: "#ffffff00",
  },
});
