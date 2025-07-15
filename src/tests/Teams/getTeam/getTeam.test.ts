import TeamsController from "@controllers/Teams";
import { deleteMultipleItens, generateMultipleItens } from "@lib";
import { expect, test } from "@playwright/test";
import type { ITeams } from "@schemas";
import generateMockedTeams from "../mockedDataTeam/mockedDataTeam";

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
		const teams = await generateMultipleItens<ITeams>(
			teamsController.createTeam.bind(teamsController),
			generateMockedTeams,
			3,
		);
		expect(teams).toBeDefined();

		const fetchedTeams = await teamsController.findAllTeams();
		expect(fetchedTeams).toBeDefined();
		expect(fetchedTeams).toMatchArrayId<ITeams>(teams);

		await deleteMultipleItens<ITeams>(teamsController.deleteTeam.bind(teamsController), teams);
	});
});
