import { format } from "date-fns";
import type { VFC } from "react";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useRecoilValue } from "recoil";
import { date, shop } from "src/atoms";
import { ListItem, Progress } from "src/components";
import { Text, View } from "src/components/custom";
import { SafeAreaLayout } from "src/components/layout";
import { useGetSWR, useThemeColor } from "src/hooks";
import type { PaymentScreenProps } from "types";
import type { Payment } from "types/fetcher";

export const PaymentListScreen: VFC<PaymentScreenProps<"PaymentList">> = (props) => {
  const color = useThemeColor({}, "text2");
  const shopInfo = useRecoilValue(shop);
  const dateInfo = useRecoilValue(date);
  const { data, isError, isLoading } = useGetSWR<Payment[]>(
    `/payment/shop/${shopInfo.id}/${dateInfo.year}/${dateInfo.month}`,
    {
      enabled: !!shopInfo.id && !!dateInfo.year && !!dateInfo.month,
    },
  );

  const renderItem = ({ item }: { item: Payment }) => {
    const onNavigation = () => {
      props.navigation.navigate("PaymentDetail", {
        id: item.id,
      });
    };
    const date = format(new Date(item.updatedAt), "yyyy年M月d日");

    return (
      <ListItem style={styles.list} onPress={onNavigation}>
        <View style={styles.leftLayout}>
          <Text style={styles.shopName}>
            {item.User.firstName}
            {item.User.lastName} 様
          </Text>
          <Text style={styles.date} lightTextColor={color} darkTextColor={color}>
            {date}
          </Text>
        </View>
        <View style={styles.rightLayout}>
          <Text style={styles.frequency} lightTextColor={color} darkTextColor={color}>
            1回払い
          </Text>
          <Text style={styles.price}>
            <Text style={styles.yensign}>¥</Text>
            {item.amount}
          </Text>
        </View>
      </ListItem>
    );
  };

  return (
    <SafeAreaLayout>
      {isLoading ? (
        <Progress />
      ) : isError ? (
        <Text>エラーが発生しました</Text>
      ) : !data ? (
        <Text>データがありません</Text>
      ) : data ? (
        <FlatList data={data} renderItem={renderItem} keyExtractor={(item, _) => String(item.id)} />
      ) : null}
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    justifyContent: "center",

    height: 60,
    width: "100%",

    borderBottomWidth: 1,
    borderBottomColor: "#b3b3b333",
  },
  list: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",

    padding: 15,
    marginHorizontal: "1%",

    borderBottomWidth: 1,
    borderBottomColor: "#88888833",
  },

  leftLayout: {},
  rightLayout: {
    justifyContent: "flex-end",
  },

  shopName: {
    paddingBottom: 10,

    fontSize: 18,
    fontWeight: "500",
    textAlign: "left",
  },
  date: {
    fontSize: 15,
    fontWeight: "normal",
    textAlign: "left",
  },
  frequency: {
    fontSize: 15,
    textAlign: "right",
    fontWeight: "normal",
  },
  price: {
    fontSize: 20,
    fontWeight: "600",
  },
  yensign: {
    fontSize: 24,
    fontWeight: "300",
  },
});
