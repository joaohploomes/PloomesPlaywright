import ProductsGroupsController from "@controllers/ProductsGroups";
import { expect, test } from "@playwright/test";
import generateMockedProductsGroups from "../mockedDataProductsGroup/mockedDataProductsGroup";

test.describe("Update Products Groups", () => {
	test("Update a Products Group Correctly", async () => {
		const productsGroupsController = new ProductsGroupsController();
		const data = generateMockedProductsGroups();
		const productGroup = await productsGroupsController.createProductGroup(data);

		expect(productGroup.Id).toBeDefined();

		const updatedData = generateMockedProductsGroups();
		const updatedProductGroup = await productsGroupsController.updateProductGroup(productGroup, updatedData);

		expect(updatedProductGroup.Name).toBe(updatedData.Name);

		await productsGroupsController.deleteProductGroup(updatedProductGroup);
	});
});
