import UsersController from "@controllers/Users";
import { test, expect } from "@playwright/test";
import generateMockedUsers from "../mockedDataUser/mockedDataUser";

test.describe("Create Users", () => {
    test("Create a new user", async () => {
        const usersController = new UsersController();
        const data = generateMockedUsers();
        const user = await usersController.createUser(data);

        expect(user.Id).toBeDefined();

        await usersController.suspendUser(user);
    });
});
