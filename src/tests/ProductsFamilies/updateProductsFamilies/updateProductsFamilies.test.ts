import ProductsFamiliesController from "@controllers/ProductsFamilies";
import { expect, test } from "@playwright/test";
import generateMockedProductsFamilies from "../mockedDataProductsFamilies/mockedDataProductsFamilies";

test.describe("Update Products Families", () => {
    test("Update a Products Family Correctly", async () => {
        const productsFamiliesController = new ProductsFamiliesController();
        const data = generateMockedProductsFamilies();
        const productFamily = await productsFamiliesController.createProductsFamilies(data);

        expect(productFamily.Id).toBeDefined();

        const updatedData = generateMockedProductsFamilies();
        const updatedProductFamily = await productsFamiliesController.updateProductsFamilies(productFamily, updatedData);

        expect(updatedProductFamily.Name).toBe(updatedData.Name);

        await productsFamiliesController.deleteProductsFamilies(updatedProductFamily);
    });
});
