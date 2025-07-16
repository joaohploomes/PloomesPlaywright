import TeamsController from "@controllers/Teams";
import { expect, test } from "@playwright/test";
import generateMockedTeams from "../mockedDataTeam/mockedDataTeam";

test.describe("Update Teams", () => {
	test("Update a Team", async () => {
		const teamsController = new TeamsController();
		const data = generateMockedTeams();
		const team = await teamsController.createTeam(data);

		expect(team.Id).toBeDefined();

		const updatedData = generateMockedTeams();
		const updatedTeam = await teamsController.updateTeam(team, updatedData);

		expect(updatedTeam.Name).toBe(updatedData.Name);

		await teamsController.deleteTeam(updatedTeam);
	});
});
