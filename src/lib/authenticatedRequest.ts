import { type APIRequestContext, request } from "@playwright/test";
import { getUserKey } from "./getUserKey";
type OptionsParameters = Parameters<typeof request.newContext>[0];

export async function authenticatedRequest(options?: OptionsParameters): Promise<APIRequestContext>;
export async function authenticatedRequest(email?: string, options?: OptionsParameters): Promise<APIRequestContext>;
export async function authenticatedRequest(...args: any[]): Promise<APIRequestContext> {
	let email: string | undefined;
	let options: OptionsParameters | undefined;
	if (args.length > 2) {
		throw new Error("Too many arguments");
	}

	if (args.length === 1) {
		if (typeof args[0] === "string") {
			email = args[0] as string;
		} else {
			options = args[0] as OptionsParameters;
		}
	} else if (args.length === 2) {
		email = args[0] as string;
		options = args[1] as OptionsParameters;
	}

	const userKey = await getUserKey({
		email: process.env.EMAIL_PLOOMES,
		isPartners: false,
		password: process.env.PASSWORD_PLOOMES,
	});

	const baseOptions: OptionsParameters = {
		baseURL: process.env.BASE_URL,
		extraHTTPHeaders: {
			"user-Key": userKey,
		},
	};

	Object.assign(baseOptions, options);

	const req = await request.newContext(baseOptions);

	return req;
}
