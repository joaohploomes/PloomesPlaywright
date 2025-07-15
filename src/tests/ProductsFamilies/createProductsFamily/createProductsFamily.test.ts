import ProductsFamiliesController from "@controllers/ProductsFamilies";
import { expect, test } from "@playwright/test";
import generateMockedProductsFamilies from "../mockedDataProductsFamily/mockedDataProductsFamily";

test.describe("Create Products Families", () => {
    test("Create a Products Family Correctly", async () => {
        const productsFamiliesController = new ProductsFamiliesController();
        const data = generateMockedProductsFamilies();
        const productFamily = await productsFamiliesController.createProductFamily(data);

        expect(productFamily.Id).toBeDefined();

        await productsFamiliesController.deleteProductFamily(productFamily);
    });
});
