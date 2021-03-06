import type { VFC } from "react";
import React, { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast/src/core/toast";
import { useSetRecoilState } from "recoil";
import { shop } from "src/atoms";
import { ColorButton, Text, TextInput } from "src/components/custom";
import { ErrorMessage } from "src/components/ErrorMessage";
import { AuthLayout } from "src/components/layout";
import { requestFetcher } from "src/functions/fetcher";
import { useThemeColor } from "src/hooks";
import { buttonStyles, textInputStyles, textStyles } from "src/styles";
import type { AuthScreenProps } from "types";
import type { VerifyAuth } from "types/fetcher";

type FormDataType = {
  verifyCode: string;
};

export const VerifyScreen: VFC<AuthScreenProps<"Verify">> = (props) => {
  const color = useThemeColor({}, "text2");
  const setShopInfo = useSetRecoilState(shop);
  const [isCertified, setIsCertified] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>();

  const { phone } = props.route.params;
  const onSubmitPress = useCallback(
    async (body: FormDataType) => {
      const toastId = toast.loading("ε¦ηδΈ­...", {
        icon: "πββοΈ",
      });

      const requestBody = { phone: "81" + phone, token: body.verifyCode };
      const { statusCode, response } = await requestFetcher<VerifyAuth>(
        "/auth/verify",
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

      toast.success("θͺθ¨ΌγζεγγΎγγ", {
        id: toastId,
        icon: "πββοΈ",
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setShopInfo((prev) => ({
        ...prev,
        id: response.user.id,
        phone: phone,
        token: response.access_token,
      }));
      setIsCertified(true);
      props.navigation.navigate("ShopInfoRegister");
    },
    [props],
  );

  const onNavigate = useCallback(() => {
    props.navigation.navigate("ShopInfoRegister");
  }, []);

  return (
    <AuthLayout>
      <Text style={textStyles.title}>η’Ίθͺγ³γΌγ</Text>

      <Text lightTextColor={color} darkTextColor={color} style={textStyles.label}>
        οΌζ‘γ?ηͺε·γε₯εγγ¦γγ γγ
      </Text>
      <Controller
        control={control}
        name="verifyCode"
        defaultValue=""
        rules={{
          required: {
            value: true,
            message: "εΏι ε₯ει η?γ§γ",
          },
          minLength: {
            value: 6,
            message: "6ζ‘γ?θͺθ¨Όγ³γΌγγε₯εγγ¦γγ γγ",
          },
          maxLength: {
            value: 6,
            message: "6ζ‘γ?θͺθ¨Όγ³γΌγγε₯εγγ¦γγ γγ",
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
      {errors.verifyCode && <ErrorMessage message={errors.verifyCode.message} />}

      <ColorButton
        title={isCertified ? "η»ι²γΈι²γ" : "ιδΏ‘"}
        outlineStyle={buttonStyles.outline}
        // eslint-disable-next-line react/jsx-handler-names
        onPress={isCertified ? onNavigate : handleSubmit(onSubmitPress)}
      />
      {isCertified ? (
        <Text lightTextColor={color} darkTextColor={color} style={textStyles.error}>
          η»ι²ζΈγΏγ§γ
        </Text>
      ) : null}
    </AuthLayout>
  );
};

// {
//   "phone": "8108027120301",
//   "result":  {
//     "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjM4NzY1MTk3LCJzdWIiOiI5YzcyNjEwZS03ZDM2LTQyZTAtODY5MC03MDdhMWE3OTE5YTIiLCJlbWFpbCI6IiIsInBob25lIjoiODEwODAyNzEyMDMwMSIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6InBob25lIiwicHJvdmlkZXJzIjpbInBob25lIl19LCJ1c2VyX21ldGFkYXRhIjp7fSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQifQ.Yjn2xozX97k1uzow-wO9HXEMyVdrNj0-ImbiEYfUyy0",
//     "expires_in": 3600,
//     "refresh_token": "MWjOy7hMIMhhiH-OsqGHRQ",
//     "token_type": "bearer",
//     "shop": null,
// }
