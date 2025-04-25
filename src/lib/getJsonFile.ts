import { readFileSync } from "node:fs";

function getJsonFile(path: string){
    try {
        return JSON.parse(readFileSync(path, "utf-8"));
    } catch {
        return {};
    }
}

export default getJsonFile;