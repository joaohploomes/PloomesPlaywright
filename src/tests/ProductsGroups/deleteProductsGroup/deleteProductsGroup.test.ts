import ProductsGroupsController from "@controllers/ProductsGroups";
import { expect, test } from "@playwright/test";
import generateMockedProductsGroups from "../mockedDataProductsGroup/mockedDataProductsGroup";

test.describe("Delete Products Groups", () => {
	test("Delete a Products Group Correctly", async () => {
		const productsGroupsController = new ProductsGroupsController();
		const data = generateMockedProductsGroups();
		const productGroup = await productsGroupsController.createProductGroup(data);
		expect(productGroup.Id).toBeDefined();

		await productsGroupsController.deleteProductGroup(productGroup);
		const deletedProductGroup = await productsGroupsController.findProductsGroupsById(productGroup.Id);
		expect(deletedProductGroup).toStrictEqual([]);
	});
});
