import UsersController from "@controllers/Users";
import { test, expect } from "@playwright/test";
import { generateMultipleItens } from "@lib";
import generateMockedUsers from "../mockedDataUsers/mockedDataUsers";

test.describe("Get Users", () => {
    test("Get a user by ID", async () => {
        const usersController = new UsersController();
        const data = generateMockedUsers();
        const user = await usersController.createUsers(data);
        expect(user.Id).toBeDefined();

        const foundUser = await usersController.findUsersById(user.Id);
        expect(foundUser).toStrictEqual([user]);

        await usersController.suspendUsers(user);
    });

    test("Get all users", async () => {
        const usersController = new UsersController();
        const users = await generateMultipleItens(usersController.createUsers.bind(usersController), generateMockedUsers, 2);
        const fetchedUsers = await usersController.findAllUsers();

        expect(fetchedUsers).toBeDefined();
        expect(fetchedUsers).toMatchArrayId(users);

        await Promise.all(
        users.map(user => usersController.suspendUsers(user))
        );
    });
});
