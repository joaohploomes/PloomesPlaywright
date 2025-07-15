import UsersController from "@controllers/Users";
import { generateMultipleItens } from "@lib";
import { expect, test } from "@playwright/test";
import generateMockedUsers from "../mockedDataUser/mockedDataUser";

test.describe("Get Users", () => {
	test("Get a user by ID", async () => {
		const usersController = new UsersController();
		const data = generateMockedUsers();
		const user = await usersController.createUser(data);
		expect(user.Id).toBeDefined();

		const fetchedUser = await usersController.findUsersById(user.Id);
		expect(fetchedUser).toStrictEqual([user]);

		await usersController.suspendUser(user);
	});

	test("Get all users", async () => {
		const usersController = new UsersController();
		const users = await generateMultipleItens(usersController.createUser.bind(usersController), generateMockedUsers, 2);
		const fetchedUsers = await usersController.findAllUsers();

		expect(fetchedUsers).toBeDefined();
		expect(fetchedUsers).toMatchArrayId(users);

		await Promise.all(users.map((user) => usersController.suspendUser(user)));
	});
});
