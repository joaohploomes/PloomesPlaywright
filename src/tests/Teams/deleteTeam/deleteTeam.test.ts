import TeamsController from "@controllers/Teams";
import { test, expect } from "@playwright/test";
import generateMockedTeams from "../mockedDataTeam/mockedDataTeam";

test.describe("Delete Teams", () => {
    test("Delete a team correctly", async () => {
        const teamsController = new TeamsController();
        const data = generateMockedTeams();
        const team = await teamsController.createTeam(data);
        expect(team.Id).toBeDefined();

        await teamsController.deleteTeam(team);
        const deletedTeam = await teamsController.findTeamById(team.Id);
        expect(deletedTeam).toStrictEqual([]);
    });
});
