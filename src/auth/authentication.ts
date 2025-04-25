import type { ILogin } from "@types";
import users from "../constants/users";
import { request } from "@playwright/test";
import { getJsonFile } from "@lib";
import { config } from "dotenv";

config();
const userKeyList = getJsonFile("userKeys.json");
const partnersKeyList = getJsonFile("partnersKeys.json");

class Authentication{

    private userKey: string;
    private baseUrl: string;

    constructor(email?: string, password?: string, isPartners?: boolean){

        this.baseUrl = isPartners ? process.env.PARTNERS_URL : process.env.BASE_URL;
        this.login({
            email: email || users.default.email,
            password: password || users.default.password,
            isPartners
        })
    }

    async login({email, password, isPartners}: ILogin){
        
        const listKeys = isPartners ? partnersKeyList : userKeyList;

        if(listKeys[email]){
            this.userKey = listKeys[email];
            return;
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
        this.userKey = data.value[0].UserKey;
    }

    async createContext(options?: Parameters<typeof request.newContext>[0]){
	    const baseOptions: Parameters<typeof request.newContext>[0] = {
            baseURL: process.env.BASE_URL,
            extraHTTPHeaders: {
                "user-Key": this.userKey,
            },
        };
        Object.assign(baseOptions, options);
        return await request.newContext(baseOptions);
    }
}

export default Authentication;