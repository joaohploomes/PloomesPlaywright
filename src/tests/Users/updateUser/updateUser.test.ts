import UsersController from "@controllers/Users";
import { expect, test } from "@playwright/test";
import generateMockedUsers from "../mockedDataUser/mockedDataUser";

test.describe("Update Users", () => {
	test("Update a User Correctly", async () => {
		const usersController = new UsersController();
		const data = generateMockedUsers();
		const user = await usersController.createUser(data);

		expect(user.Id).toBeDefined();

		const updatedData = generateMockedUsers();
		const updatedUser = await usersController.updateUser(user, updatedData);
		expect(updatedUser.Name).toBe(updatedData.Name);

		await usersController.suspendUser(updatedUser);
	});
});
