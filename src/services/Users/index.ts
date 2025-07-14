import type { APIRequestContext } from "@playwright/test";
import type { IUsers } from "@schemas";
import Authentication from "../../auth/authentication";
import type { IUser } from "@types";
import { QueryOdata } from "@lib";

class UsersService {
    endpoint = "Users";
    request: APIRequestContext;
    auth = new Authentication();

    constructor(user?: IUser) {
        if (user) {
            this.auth.updateUser(user);
        }
    };

    async findAllUsers(top: number): Promise<IUsers[]> {
        const context = await this.auth.createContext();
        const odata = new QueryOdata({
            orderBy: { Id: "desc" },
            top,
        });
        const query = odata.toString();
        const response = await context.get(`${this.endpoint}?${query}`);
        const json = await response.json();
        return json.value;
    };

    async createUser(user: IUsers): Promise<IUsers> {
        const context = await this.auth.createContext();
        const response = await context.post(`${this.endpoint}`, { data: user });
        const json = await response.json();
        return json.value[0];
    };

    async updateUser(user: IUsers, data: Partial<IUsers>) {
        const context = await this.auth.createContext();
        const response = await context.patch(`${this.endpoint}(${user.Id})`, { data });
        const json = await response.json();
        return json.value[0];
    };

    async findUserById(Id: number): Promise<IUsers[]> {
        const context = await this.auth.createContext();
        const query = `$filter=Id eq ${Id}`;
        const response = await context.get(`${this.endpoint}?${query}`);
        const json = await response.json();
        return json.value;
    };
};

export default UsersService;
