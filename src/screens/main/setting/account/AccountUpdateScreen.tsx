import type { VFC } from "react";
import React, { useCallback } from "react";
import { ColorButton } from "src/components/custom";
import { Layout } from "src/components/layout";
import { useThemeColor } from "src/hooks";
import { buttonStyles } from "src/styles";
import type { AccountScreenProps } from "types";

export const AccountUpdateScreen: VFC<AccountScreenProps<"AccountUpdate">> = () => {
  const accent = useThemeColor({}, "accent");

  const onSubmit = useCallback(async () => {
    console.info("更新");
  }, []);

  return (
    <Layout>
      <ColorButton
        title="サインアウト"
        lightBgColor={accent}
        darkBgColor={accent}
        outlineStyle={[buttonStyles.outline, buttonStyles.semi]}
        onPress={onSubmit}
      />
    </Layout>
  );
};
