import type { ILogin, IUser } from "@types";
import users from "../constants/users";
import { request } from "@playwright/test";
import { getJsonFile, updateJsonFile } from "@lib";
import { config } from "dotenv";

config();
const userKeyPath = "userKeys.json";
const partnersKeyPath = "partnersKeys.json";
const userKeyList = getJsonFile(userKeyPath);
const partnersKeyList = getJsonFile(partnersKeyPath);

class Authentication{

    private baseUrl = process.env.BASE_URL;
    private listKeys: Record<string, string> = userKeyList;
    private listKeyPath = userKeyPath;
    private user: IUser = {
        email: users.default.email,
        password: users.default.password
    }

    constructor(isPartners?: boolean){
        if(isPartners){
            this.listKeyPath = partnersKeyPath;
            this.baseUrl = process.env.PARTNERS_URL; 
            this.listKeys = partnersKeyList;
        }
    }

    updateUser(user: IUser){
        if(user) this.user = user;
    }

    async login({email, password}: ILogin){
        if(this.listKeys[email]){
            return this.listKeys[email];
        }
        const url = `${this.baseUrl}/Self/Login?\$select=UserKey`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Email: email, Password: password }),
        });

        if(response.status !== 200){
            console.info(await response.text());
            throw new Error(`Unexpected status code: ${response.status}`);
        }
        const data = await response.json();
        const userKey = data.value[0].UserKey;

        this.listKeys = {
            ...this.listKeys,
            [email]: userKey
        }

        await updateJsonFile(this.listKeyPath, this.listKeys);

        return userKey;
    }

    async createContext(options?: Parameters<typeof request.newContext>[0]){
        const userKey = await this.login({
            email: this.user.email,
            password: this.user.password
        });

	    const baseOptions: Parameters<typeof request.newContext>[0] = {
            baseURL: process.env.BASE_URL,
            extraHTTPHeaders: {
                "user-Key": userKey,
            },
        };

        Object.assign(baseOptions, options);
        return await request.newContext(baseOptions);
    }
}

export default Authentication;