import TeamsController from "@controllers/Teams";
import { test, expect } from "@playwright/test";
import generateMockedTeams from "../mockedDataTeam/mockedDataTeam";
import { generateMultipleItens, deleteMultipleItens } from "@lib";
import type { ITeams } from "@schemas";

test.describe("Get Teams", () => {
    test("Get Teams Correctly", async () => {
        const teamsController = new TeamsController();
        const data = generateMockedTeams();
        const team = await teamsController.createTeam(data);
        expect(team.Id).toBeDefined();

        const fetchedTeam = await teamsController.findTeamById(team.Id);
        expect(fetchedTeam).toStrictEqual([team]);

        await teamsController.deleteTeam(team);
    });

    test("Get all Teams", async () => {
        const teamsController = new TeamsController();
        const teams = await generateMultipleItens<ITeams>(teamsController.createTeam.bind(teamsController), generateMockedTeams, 3);
        expect(teams).toBeDefined();

        const fetchedTeams = await teamsController.findAllTeams();
        expect(fetchedTeams).toBeDefined();
        expect(fetchedTeams).toMatchArrayId<ITeams>(teams);

        await deleteMultipleItens<ITeams>(teamsController.deleteTeam.bind(teamsController), teams);
    });
}); 
