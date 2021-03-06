import type { VFC } from "react";
import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast/src/core/toast";
import { useRecoilState } from "recoil";
import { shop } from "src/atoms";
import { ErrorMessage } from "src/components";
import { ColorButton, Text, TextInput } from "src/components/custom";
import { AuthLayout } from "src/components/layout";
import { requestFetcher } from "src/functions/fetcher/requestFetcher";
import { saveSequreStore } from "src/functions/store";
import { useThemeColor } from "src/hooks";
import { buttonStyles, textInputStyles, textStyles } from "src/styles";
import type { AuthScreenProps } from "types";
import type { User } from "types/fetcher";

type FormDataType = {
  shopName: string;
  address: string;
  email?: string;
  phone?: string;
};

export const ShopInfoRegisterScreen: VFC<AuthScreenProps<"ShopInfoRegister">> = () => {
  const color = useThemeColor({}, "text2");
  const [shopInfo, setShopInfo] = useRecoilState(shop);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>();

  const onSubmitPress = useCallback(async (body: FormDataType) => {
    const toastId = toast.loading("ε¦ηδΈ­...", {
      icon: "πββοΈ",
    });

    const requestBody = {
      ...body,
      id: shopInfo.id,
      phone: body.phone || shopInfo.phone,
      email: body.email || shopInfo.email,
      token: shopInfo.token,
    };

    const { statusCode, response } = await requestFetcher<User>(
      "/auth/register/shop",
      requestBody,
      "POST",
    );

    if (statusCode >= 400) {
      toast("γ¨γ©γΌγηΊηγγΎγγ", {
        id: toastId,
        icon: "π€¦ββοΈ",
      });
      return;
    }

    toast.success("γ¦γΌγΆγΌζε ±γη»ι²γγΎγγ", {
      duration: 1500,
      id: toastId,
      icon: "πββοΈ",
    });
    await new Promise((resolve) => setTimeout(resolve, 400));

    await saveSequreStore("access_token", response.token);
    await setShopInfo((prev) => ({
      ...prev,
      isSignin: true,
    }));
  }, []);

  return (
    <AuthLayout>
      <Text style={textStyles.title}>γε?’ζ§ζε ±η»ι²</Text>

      <Text lightTextColor={color} darkTextColor={color} style={textStyles.label}>
        εΊθε
      </Text>
      <Controller
        control={control}
        name="shopName"
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
      {errors.shopName && <ErrorMessage message={errors.shopName.message} />}

      <Text lightTextColor={color} darkTextColor={color} style={textStyles.label}>
        δ½ζ
      </Text>
      <Controller
        control={control}
        name="address"
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
      {errors.address && <ErrorMessage message={errors.address.message} />}

      <Text lightTextColor={color} darkTextColor={color} style={textStyles.label}>
        {shopInfo.email ? "ι»θ©±ηͺε·" : "γ‘γΌγ«γ’γγ¬γΉ"}
      </Text>
      {shopInfo.email ? (
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

      <ColorButton
        title="η»ι²"
        outlineStyle={buttonStyles.outline}
        // eslint-disable-next-line react/jsx-handler-names
        onPress={handleSubmit(onSubmitPress)}
      />
    </AuthLayout>
  );
};
