/* eslint-disable @typescript-eslint/naming-convention */
/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

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
			Modal1: "modal1",
			Modal2: "modal2",
			NotFound: "*",
		},
	},
};
