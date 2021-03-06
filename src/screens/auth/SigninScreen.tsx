import sha512 from "js-sha512";
import type { VFC } from "react";
import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast/src/core/toast";
import { useSetRecoilState } from "recoil";
import { shop } from "src/atoms";
import { ErrorMessage } from "src/components";
import { ColorButton, Text, TextInput } from "src/components/custom";
import { AuthLayout } from "src/components/layout";
import { requestFetcher } from "src/functions/fetcher";
import { saveSequreStore } from "src/functions/store";
import { useTab, useThemeColor } from "src/hooks";
import { buttonStyles, textInputStyles, textStyles } from "src/styles";
import type { AuthScreenProps } from "types";
import type { Shop } from "types/fetcher";

type FormDataType = {
  email?: string;
  phone?: string;
  password: string;
};

export const SigninScreen: VFC<AuthScreenProps<"Signin">> = () => {
  const color = useThemeColor({}, "text2");
  const { select, Tab } = useTab();
  const setShopInfo = useSetRecoilState(shop);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>();

  const onSubmitPress = useCallback(
    async (body: FormDataType) => {
      const toastId = toast.loading("ε¦ηδΈ­...", {
        icon: "πββοΈ",
      });

      const hashedPassword = sha512(body.password);
      const requestBody = {
        phoneOrEmail: select === "phone" ? "81" + body.phone : body.email,
        password: hashedPassword,
        key: select,
      };
      const { statusCode, response } = await requestFetcher<Shop>(
        "/auth/signin/shop",
        requestBody,
        "POST",
      );

      if (statusCode >= 400) {
        toast.error("γ¨γ©γΌγηΊηγγΎγγ", {
          id: toastId,
          icon: "π€¦ββοΈ",
        });
        return;
      }

      toast.success("γ΅γ€γ³γ€γ³γγΎγγ", {
        duration: 1500,
        id: toastId,
        icon: "πββοΈ",
      });
      await new Promise((resolve) => setTimeout(resolve, 400));

      await saveSequreStore("access_token", response.token);
      setShopInfo({
        id: response.id,
        shopName: response.shopName,
        address: response.address,
        email: response.email,
        phone: response.phone,
        token: response.token,
        isSignin: true,
      });
    },
    [select],
  );

  return (
    <AuthLayout tab={<Tab />}>
      <Text lightTextColor={color} darkTextColor={color} style={textStyles.label}>
        {select === "phone" ? "ι»θ©±ηͺε·" : "γ‘γΌγ«γ’γγ¬γΉ"}
      </Text>

      {select === "phone" ? (
        <Controller
          control={control}
          name="phone"
          defaultValue=""
          rules={{
            required: {
              value: true,
              message: "εΏι ε₯ει η?γ§γ",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              bgStyle={textInputStyles.bg}
              onChangeText={onChange}
              value={value}
              placeholder=""
            />
          )}
        />
      ) : (
        <Controller
          control={control}
          name="email"
          defaultValue=""
          rules={{
            required: {
              value: true,
              message: "εΏι ε₯ει η?γ§γ",
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "γ‘γΌγ«γ’γγ¬γΉγ?ε½’εΌγζ­£γγγγγΎγγ",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              bgStyle={textInputStyles.bg}
              onChangeText={onChange}
              value={value}
              placeholder=""
            />
          )}
        />
      )}
      {errors.phone && <ErrorMessage message={errors.phone.message} />}
      {errors.email && <ErrorMessage message={errors.email.message} />}

      <Text lightTextColor={color} darkTextColor={color} style={textStyles.label}>
        γγΉγ―γΌγ
      </Text>
      <Controller
        control={control}
        name="password"
        defaultValue=""
        rules={{
          required: {
            value: true,
            message: "εΏι ε₯ει η?γ§γ",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            bgStyle={textInputStyles.bg}
            onChangeText={onChange}
            value={value}
            placeholder=""
            secureTextEntry
          />
        )}
      />
      {errors.password && <ErrorMessage message={errors.password.message} />}

      <ColorButton
        title="γ΅γ€γ³γ€γ³"
        outlineStyle={buttonStyles.outline}
        // eslint-disable-next-line react/jsx-handler-names
        onPress={handleSubmit(onSubmitPress)}
      />
    </AuthLayout>
  );
};
