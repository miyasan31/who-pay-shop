import { Feather, Ionicons } from "@expo/vector-icons";
import type { VFC } from "react";
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { KeyButton } from "src/components";
import { ColorButton, Text, View } from "src/components/custom";
import { Layout } from "src/components/layout";
import { useThemeColor } from "src/hooks";
import { buttonStyles, textStyles } from "src/styles";
import type { PayScreenProps } from "types";

const formatter = new Intl.NumberFormat("ja-JP");

export const CalculatorScreen: VFC<PayScreenProps<"Calculator">> = (props) => {
  const icon1 = useThemeColor({}, "icon1");
  const color = useThemeColor({}, "text2");
  const backGroundColor = useThemeColor({}, "bg1");
  const [amount, setAmount] = useState("");

  const amountText = useMemo(() => {
    return formatter.format(Number(amount));
  }, [amount]);

  const onClick = useCallback((number?: string) => {
    setAmount((prevAmount) => {
      if (prevAmount.length === 10) return prevAmount;
      if (number && prevAmount === "" && ["0", "00"].includes(number))
        return "";
      return prevAmount + number;
    });
  }, []);

  const onDelete = useCallback(() => {
    setAmount((prevAmount) => prevAmount.slice(0, -1));
  }, []);

  const onClear = useCallback(() => {
    setAmount("");
  }, []);

  const onVoiceAuthentication = useCallback(async (amount: string) => {
    props.navigation.replace("VoiceRecord", { amount: amount });
  }, []);

  return (
    <Layout>
      <Text style={textStyles.messageTitle}>お支払い金額を入力</Text>

      <View
        lightBgColor={backGroundColor}
        darkBgColor={backGroundColor}
        style={styles.amountArea}
      >
        <Text style={styles.yensign}>¥</Text>
        <Text style={styles.amountText}>{amountText}</Text>
        <Feather name="x-circle" size={30} color={icon1} onPress={onClear} />
      </View>

      <View style={styles.keyRow}>
        <KeyButton title="7" onPress={onClick} />
        <KeyButton title="8" onPress={onClick} />
        <KeyButton title="9" onPress={onClick} />
      </View>
      <View style={styles.keyRow}>
        <KeyButton title="4" onPress={onClick} />
        <KeyButton title="5" onPress={onClick} />
        <KeyButton title="6" onPress={onClick} />
      </View>
      <View style={styles.keyRow}>
        <KeyButton title="1" onPress={onClick} />
        <KeyButton title="2" onPress={onClick} />
        <KeyButton title="3" onPress={onClick} />
      </View>
      <View style={styles.keyRow}>
        <KeyButton title="0" onPress={onClick} />
        <KeyButton title="00" onPress={onClick} />
        <KeyButton onPress={onDelete}>
          <Ionicons name="backspace" size={40} color={color} />
        </KeyButton>
      </View>

      <ColorButton
        title="音声確認へ"
        outlineStyle={[buttonStyles.outline, buttonStyles.semi]}
        onPress={() => onVoiceAuthentication(amount)}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  amountArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    paddingHorizontal: 25,
    height: 50,
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#bababa",
  },
  yensign: {
    flex: 2,
    fontSize: 40,
    fontWeight: "bold",
  },
  amountText: {
    flex: 10,
    fontSize: 30,
    paddingRight: 20,
    fontWeight: "bold",
    textAlign: "right",
  },

  keyRow: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 5,
  },
});
