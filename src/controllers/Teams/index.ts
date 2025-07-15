import type { ITeams } from "@schemas";
import TeamsService from "@services/Teams";
import type { IUser } from "@types";

class TeamsController {

    private user?: IUser;

    constructor(user?: IUser) {
        this.user = user;
    }

    async findAllTeams(top = 15) {
        const teamsService = new TeamsService(this.user);
        const response = await teamsService.findAllTeams(top);
        return response;
    };

    async findTeamById(Id: number) {
        const teamsService = new TeamsService(this.user);
        const response = await teamsService.findTeamById(Id);
        return response;
    };

    async createTeam(data: ITeams) {
        const teamsService = new TeamsService(this.user);
        const response = await teamsService.createTeam(data);
        return response;
    };

    async updateTeam(team: ITeams, data: Partial<ITeams>) {
        const teamsService = new TeamsService(this.user);
        const response = await teamsService.updateTeam(team, data);
        return response;
    };

    async deleteTeam(team: ITeams) {
        const teamsService = new TeamsService(this.user);
        const response = await teamsService.deleteTeam(team);
        return response;
    };
};

export default TeamsController;
