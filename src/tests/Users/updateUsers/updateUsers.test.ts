import UsersController from "@controllers/Users";
import { test, expect } from "@playwright/test";
import generateMockedUsers from "../mockedDataUsers/mockedDataUsers";

test.describe("Update Users", () => {
    test("Update a User Correctly", async () => {
        const usersController = new UsersController();
        const data = generateMockedUsers();
        const user = await usersController.createUsers(data);

        expect(user.Id).toBeDefined();

        const updatedData = generateMockedUsers();
        const updatedUser = await usersController.updateUsers(user, updatedData);
        expect(updatedUser.Name).toBe(updatedData.Name);

        await usersController.suspendUsers(updatedUser);
    });
});
