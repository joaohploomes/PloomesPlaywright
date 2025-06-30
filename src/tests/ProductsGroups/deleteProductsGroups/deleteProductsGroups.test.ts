import ProductsGroupsController from "@controllers/productsGroups";
import { expect, test } from "@playwright/test";
import generateMockedProductsGroups from "../mockedDataProductsGroups/mockedDataProductsGroups";

test.describe("Delete Products Groups", () => {
    test("Delete a Products Group Correctly", async () => {
        const productsGroupsController = new ProductsGroupsController();
        const data = generateMockedProductsGroups();
        const productGroup = await productsGroupsController.createProductsGroups(data);
        expect(productGroup.Id).toBeDefined();

        await productsGroupsController.deleteProductsGroups(productGroup);
        const deletedProductGroup = await productsGroupsController.findProductsGroupsById(productGroup.Id);
        expect(deletedProductGroup).toStrictEqual([]);
    });
});
