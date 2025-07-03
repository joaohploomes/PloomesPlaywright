import ProductsController from "@controllers/Products";
import { test, expect } from "@playwright/test";
import generateMockedProducts from "../mockedDataProducts/mockedDataProducts";

test.describe("Create Products", () => {
    test("Create a new product", async () => {
        const productsController = new ProductsController();
        const data = generateMockedProducts();
        const product = await productsController.createProducts(data);

        expect(product.Id).toBeDefined();

        await productsController.deleteProducts(product);
    });
});
