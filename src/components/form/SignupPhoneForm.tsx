import sha512 from "js-sha512";
import type { VFC } from "react";
import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast/src/core/toast";
import { ColorButton, Text, TextInput } from "src/components/custom";
import { ErrorMessage } from "src/components/ErrorMessage";
import { authRequestFetcher } from "src/functions/fetcher";
import { useThemeColor } from "src/hooks";
import { buttonStyles, textInputStyles, textStyles } from "src/styles";

type FormDataType = {
  phone: string;
  password: string;
};

export const SignupPhoneForm: VFC<any> = (props) => {
  const color = useThemeColor({}, "text2");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>();

  const onSubmitPress = useCallback(
    async (body: FormDataType) => {
      const toastId = toast.loading("ๅฆ็ไธญ...", {
        icon: "๐โโ๏ธ",
      });

      const hashedPassword = sha512(body.password);
      const requestBody = {
        phone: "81" + body.phone,
        password: hashedPassword,
      };
      const { statusCode } = await authRequestFetcher("/auth/signup/phone", requestBody, "POST");

      if (statusCode >= 400) {
        toast.error("ใจใฉใผใ็บ็ใใพใใ", {
          id: toastId,
          icon: "๐คฆโโ๏ธ",
        });
        return;
      }

      toast.success("็ขบ่ชใณใผใใ้ไฟกใใพใใ", {
        id: toastId,
        icon: "๐โโ๏ธ",
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));

      props.navigation.navigate("Verify", { phone: body.phone });
    },
    [props],
  );

  return (
    <>
      <Text lightTextColor={color} darkTextColor={color} style={textStyles.label}>
        ้ป่ฉฑ็ชๅท
      </Text>

      <Controller
        control={control}
        name="phone"
        defaultValue=""
        rules={{
          required: {
            value: true,
            message: "ๅฟ้ ๅฅๅ้ ็ฎใงใ",
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
      {errors.phone && <ErrorMessage message={errors.phone.message} />}

      <Text lightTextColor={color} darkTextColor={color} style={textStyles.label}>
        ใในใฏใผใ
      </Text>
      <Controller
        control={control}
        name="password"
        defaultValue=""
        rules={{
          required: {
            value: true,
            message: "ๅฟ้ ๅฅๅ้ ็ฎใงใ",
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
        title="็ขบ่ชใณใผใใๅใๅใ"
        outlineStyle={buttonStyles.outline}
        // eslint-disable-next-line react/jsx-handler-names
        onPress={handleSubmit(onSubmitPress)}
      />
    </>
  );
};
