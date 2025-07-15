import ProductsFamiliesController from "@controllers/ProductsFamilies";
import { expect, test } from "@playwright/test";
import generateMockedProductsFamilies from "../mockedDataProductsFamily/mockedDataProductsFamily";

test.describe("Update Products Families", () => {
	test("Update a Products Family Correctly", async () => {
		const productsFamiliesController = new ProductsFamiliesController();
		const data = generateMockedProductsFamilies();
		const productFamily = await productsFamiliesController.createProductFamily(data);

		expect(productFamily.Id).toBeDefined();

		const updatedData = generateMockedProductsFamilies();
		const updatedProductFamily = await productsFamiliesController.updateProductFamily(productFamily, updatedData);

		expect(updatedProductFamily.Name).toBe(updatedData.Name);

		await productsFamiliesController.deleteProductFamily(updatedProductFamily);
	});
});
