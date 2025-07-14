import UsersController from "@controllers/Users";
import { test, expect } from "@playwright/test";
import generateMockedUsers from "../mockedDataUsers/mockedDataUsers";

test.describe("Suspend Users", () => {
    test("Suspend a user by ID", async () => {
        const usersController = new UsersController();
        const data = generateMockedUsers();
        const user = await usersController.createUsers(data);
        expect(user.Id).toBeDefined();

        const suspendedUser = await usersController.suspendUsers(user);
        expect(suspendedUser.Suspended).toBe(true);
    });
});
