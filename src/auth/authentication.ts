import type { ILogin, IUser } from "@types";
import users from "../constants/users";
import { request } from "@playwright/test";
import { getJsonFile } from "@lib";
import { config } from "dotenv";

config();
const userKeyList = getJsonFile("userKeys.json");
const partnersKeyList = getJsonFile("partnersKeys.json");

class Authentication{

    private baseUrl = process.env.BASE_URL;
    private listKeys: Record<string, string> = userKeyList;
    private user: IUser = {
        email: users.default.email,
        password: users.default.password
    }

    constructor(isPartners?: boolean){
        if(isPartners){
            this.baseUrl = process.env.PARTNERS_URL; 
            this.listKeys = partnersKeyList;
        }
    }

    updateUser(user: IUser){
        if(user) this.user = user;
    }

    async login({email, password}: ILogin){
        console.log(this.baseUrl, this.listKeys)
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
        return data.value[0].UserKey;
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