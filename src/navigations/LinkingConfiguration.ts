import type { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import type { RootStackParamList } from "types";

export const LinkingConfiguration: LinkingOptions<RootStackParamList> = {
	prefixes: [Linking.makeUrl("/")],
	config: {
		screens: {
			Root: {
				screens: {
					TabOne: {
						screens: {
							TabOneScreen: "one",
						},
					},
					TabTwo: {
						screens: {
							TabTwoScreen: "two",
						},
					},
					TabThree: {
						screens: {
							TabThreeScreen: "three",
						},
					},
				},
			},
			Signin: "Signin",
			Signup: "Signup",
			Verify: "Verify",

			Calculator: "Calculator",
			Record: "Record",

			Modal: "modal",
			NotFound: "*",
		},
	},
};
