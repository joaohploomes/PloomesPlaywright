import ProductsController from "@controllers/Products";
import { test, expect } from "@playwright/test";
import generateMockedProducts from "../mockedDataProducts/mockedDataProducts";

test.describe("Update Products", () => {
    test("Update a Product Correctly", async () => {
        const productsController = new ProductsController();
        const data = generateMockedProducts();
        const product = await productsController.createProducts(data);

        expect(product.Id).toBeDefined();

        const updatedData = generateMockedProducts();
        const updatedProduct = await productsController.updateProducts(product, updatedData);

        expect(updatedProduct.Name).toBe(updatedData.Name);

        await productsController.deleteProducts(updatedProduct);
    });
});
