import sha512 from "js-sha512";
import type { VFC } from "react";
import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast/src/core/toast";
import { useSetRecoilState } from "recoil";
import { shop } from "src/atoms";
import { ColorButton, Text, TextInput } from "src/components/custom";
import { ErrorMessage } from "src/components/ErrorMessage";
import { requestFetcher } from "src/functions/fetcher";
import { useThemeColor } from "src/hooks";
import { buttonStyles, textInputStyles, textStyles } from "src/styles";
import type { VerifyAuth } from "types/fetcher";

type FormDataType = {
  email: string;
  password: string;
};

export const SignupEmailForm: VFC<any> = (props) => {
  const color = useThemeColor({}, "text2");
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
        email: body.email,
        password: hashedPassword,
      };
      const { statusCode, response } = await requestFetcher<VerifyAuth>(
        "/auth/signup/email",
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

      toast.success("θͺθ¨ΌγζεγγΎγγ", {
        id: toastId,
        icon: "πββοΈ",
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setShopInfo((prev) => ({
        ...prev,
        id: response.user.id,
        email: body.email,
        token: response.access_token,
      }));

      props.navigation.navigate("ShopInfoRegister");
    },
    [props],
  );

  return (
    <>
      <Text lightTextColor={color} darkTextColor={color} style={textStyles.label}>
        γ‘γΌγ«γ’γγ¬γΉ
      </Text>

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
        title="γ΅γ€γ³γ’γγ"
        outlineStyle={buttonStyles.outline}
        // eslint-disable-next-line react/jsx-handler-names
        onPress={handleSubmit(onSubmitPress)}
      />
    </>
  );
};
