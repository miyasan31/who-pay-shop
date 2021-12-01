import { REACT_NATIVE_PUBLIC_API_URL } from "@env";

// eslint-disable-next-line no-restricted-syntax
type Method = "GET" | "POST" | "PUT" | "DELETE";

export const fetcher = async (url: string, body: any, method: Method) => {
	console.info(`${REACT_NATIVE_PUBLIC_API_URL}${url}`);
	return await fetch(`${REACT_NATIVE_PUBLIC_API_URL}${url}`, {
		method: method,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});
};
