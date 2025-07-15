import { writeFile } from "node:fs/promises";

async function updateJsonFile(path: string, data: Record<string, string>) {
	await writeFile(path, JSON.stringify(data, null, 2));
}

export default updateJsonFile;
