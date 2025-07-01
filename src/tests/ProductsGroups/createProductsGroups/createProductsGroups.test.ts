import ProductsGroupsController from "@controllers/productsGroups";
import { expect, test } from "@playwright/test";
import generateMockedProductsGroups from "../mockedDataProductsGroups/mockedDataProductsGroups";

test.describe("Create Products Groups", () => {
    test("Create a Products Group with Family Correctly", async () => {
        const productsGroupsController = new ProductsGroupsController();
        const data = generateMockedProductsGroups();
        const productGroup = await productsGroupsController.createProductsGroups(data);

        expect(productGroup.Id).toBeDefined();

        await productsGroupsController.deleteProductsGroups(productGroup);
    });

    test("Create a Products Group without Family Correctly", async () => {
        const productsGroupsController = new ProductsGroupsController();
        const data = generateMockedProductsGroups();
        data.FamilyId = null;
        const productGroup = await productsGroupsController.createProductsGroups(data);

        expect(productGroup.Id).toBeDefined();

        await productsGroupsController.deleteProductsGroups(productGroup);
    });
});
