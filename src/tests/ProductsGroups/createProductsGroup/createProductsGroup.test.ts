import ProductsGroupsController from "@controllers/ProductsGroups";
import { expect, test } from "@playwright/test";
import generateMockedProductsGroups from "../mockedDataProductsGroup/mockedDataProductsGroup";

test.describe("Create Products Groups", () => {
    test("Create a Products Group with Family Correctly", async () => {
        const productsGroupsController = new ProductsGroupsController();
        const data = generateMockedProductsGroups();
        const productGroup = await productsGroupsController.createProductGroup(data);

        expect(productGroup.Id).toBeDefined();

        await productsGroupsController.deleteProductGroup(productGroup);
    });

    test("Create a Products Group without Family Correctly", async () => {
        const productsGroupsController = new ProductsGroupsController();
        const data = generateMockedProductsGroups();
        data.FamilyId = null;
        const productGroup = await productsGroupsController.createProductGroup(data);

        expect(productGroup.Id).toBeDefined();

        await productsGroupsController.deleteProductGroup(productGroup);
    });
});
