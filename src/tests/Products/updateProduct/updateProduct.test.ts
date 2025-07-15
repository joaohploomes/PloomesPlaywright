import ProductsController from "@controllers/Products";
import { expect, test } from "@playwright/test";
import generateMockedProducts from "../mockedDataProduct/mockedDataProduct";

test.describe("Update Products", () => {
	test("Update a Product Correctly", async () => {
		const productsController = new ProductsController();
		const data = generateMockedProducts();
		const product = await productsController.createProduct(data);

		expect(product.Id).toBeDefined();

		const updatedData = generateMockedProducts();
		const updatedProduct = await productsController.updateProduct(product, updatedData);

		expect(updatedProduct.Name).toBe(updatedData.Name);

		await productsController.deleteProduct(updatedProduct);
	});
});
