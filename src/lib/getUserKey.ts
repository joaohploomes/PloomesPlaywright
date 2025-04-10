import { readFileSync } from "node:fs";
import { writeFile } from "node:fs/promises";

const parseJsonFile = (path: string) => {
	try {
		return JSON.parse(readFileSync(path, "utf-8"));
	} catch {
		return {};
	}
};

const userKeys = parseJsonFile("userKeys.json");
const partnersKeys = parseJsonFile("partnersKeys.json");

type UserKey = string;
type Payload = { email: string; password: string; isPartners: boolean };

/**
 * This function takes an email and password and synchronously returns
 * the user key of the user with that email and password
 */
export async function getUserKey({ email, password, isPartners }: Payload): Promise<UserKey> {
	const filePath = isPartners ? "partnersKeys.json" : "userKeys.json";
	const keysData = isPartners ? partnersKeys : userKeys;
	const baseUrl = isPartners ? process.env.PARTNERS_BASE_URL : process.env.BASE_URL;

	if (keysData[email]) {
		console.info(`User key for ${email} found in cache`);
		return keysData[email];
	}

	const remoteUserKey = await getUserKeyFromRemote(email, password, baseUrl);

	console.info(`User key for ${email} fetched from remote`);

	keysData[email] = remoteUserKey;

	await writeFile(filePath, JSON.stringify(keysData, null, 2));
	return remoteUserKey;
}

async function getUserKeyFromRemote(email: string, password: string, baseUrl: string) {
	const url = `${baseUrl}/Self/Login?\$select=UserKey`;
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ Email: email, Password: password }),
	});

	if (response.status !== 200) {
		console.info(await response.text());
		console.error(`Failed to fetch user key for ${email} and ${password}`);
		throw new Error(`Unexpected status code: ${response.status}`);
	}

	const data = await response.json();
	return data.value[0].UserKey;
}
