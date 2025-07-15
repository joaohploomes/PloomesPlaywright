import TeamsController from "@controllers/Teams";
import { test, expect } from "@playwright/test";
import generateMockedTeams from "../mockedDataTeam/mockedDataTeam";

test.describe("Create Teams", () => {
    test("Create a new team", async () => {
        const teamsController = new TeamsController();
        const data = generateMockedTeams();
        const team = await teamsController.createTeam(data);

        expect(team.Id).toBeDefined();

        await teamsController.deleteTeam(team);
    });
});
