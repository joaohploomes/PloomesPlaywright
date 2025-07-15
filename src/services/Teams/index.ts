import type { APIRequestContext } from "@playwright/test";
import type { ITeams } from "@schemas";
import Authentication from "../../auth/authentication";
import type { IUser } from "@types";
import { QueryOdata } from "@lib";

class TeamsService {
    endpoint = "Teams";
    request: APIRequestContext;
    auth = new Authentication();

    constructor(user?: IUser) {
        if (user) {
            this.auth.updateUser(user);
        }
    }

    async findAllTeams(top: number): Promise<ITeams[]> {
        const context = await this.auth.createContext();
        const odata = new QueryOdata({
            orderBy: { Id: "desc" },
            top: top,
        });
        const query = odata.toString();
        const response = await context.get(`${this.endpoint}?${query}`);
        const json = await response.json();
        return json.value;
    }

    async createTeam(team: ITeams): Promise<ITeams> {
        const context = await this.auth.createContext();
        const response = await context.post(`${this.endpoint}`, { data: team });
        const json = await response.json();
        return json.value[0];
    };

    async updateTeam(team: ITeams, data: Partial<ITeams>) {
        const context = await this.auth.createContext();
        const response = await context.patch(`${this.endpoint}(${team.Id})`, { data: data });
        const json = await response.json();
        return json.value[0];
    };

    async deleteTeam(team: ITeams) {
        const context = await this.auth.createContext();
        const response = await context.delete(`${this.endpoint}(${team.Id})`);
        return response;
    };

    async findTeamById(Id: number): Promise<ITeams[]> {
        const context = await this.auth.createContext();
        const query = `$filter=Id eq ${Id}`;
        const response = await context.get(`${this.endpoint}?${query}`);
        const json = await response.json();
        return json.value;
    };
};

export default TeamsService;
