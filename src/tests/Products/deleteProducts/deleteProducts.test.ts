import ProductsController from "@controllers/Products";
import { test, expect } from "@playwright/test";
import generateMockedProducts from "../mockedDataProducts/mockedDataProducts";

test.describe("Delete Products", () => {
    test("Delete a product correctly", async () => {
        const productsController = new ProductsController();
        const data = generateMockedProducts();
        const product = await productsController.createProducts(data);
        expect(product.Id).toBeDefined();

        await productsController.deleteProducts(product);
        const deletedProduct = await productsController.findProductsById(product.Id);
        expect(deletedProduct).toStrictEqual([]);
    });
});
