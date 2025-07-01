import ProductsGroupsController from "@controllers/productsGroups";
import { expect, test } from "@playwright/test";
import generateMockedProductsGroups from "../mockedDataProductsGroups/mockedDataProductsGroups";

test.describe("Update Products Groups", () => {
    test("Update a Products Group Correctly", async () => {
        const productsGroupsController = new ProductsGroupsController();
        const data = generateMockedProductsGroups();
        const productGroup = await productsGroupsController.createProductsGroups(data);

        expect(productGroup.Id).toBeDefined();

        const updatedData = generateMockedProductsGroups();
        const updatedProductGroup = await productsGroupsController.updateProductsGroups(productGroup, updatedData);

        expect(updatedProductGroup.Name).toBe(updatedData.Name);

        await productsGroupsController.deleteProductsGroups(updatedProductGroup);
    });
});
