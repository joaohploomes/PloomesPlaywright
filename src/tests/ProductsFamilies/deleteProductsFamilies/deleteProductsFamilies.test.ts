import ProductsFamiliesController from "@controllers/ProductsFamilies";
import { expect, test } from "@playwright/test";
import generateMockedProductsFamilies from "../mockedDataProductsFamilies/mockedDataProductsFamilies";

test.describe("Delete Products Families", () => {
    test("Delete a Products Family Correctly", async () => {
        const productsFamiliesController = new ProductsFamiliesController();
        const data = generateMockedProductsFamilies();
        const productFamily = await productsFamiliesController.createProductsFamilies(data);
        expect(productFamily.Id).toBeDefined();

        await productsFamiliesController.deleteProductsFamilies(productFamily);
        const deletedProductFamily = await productsFamiliesController.findProductsFamiliesById(productFamily.Id);
        expect(deletedProductFamily).toStrictEqual([]);
    });
});
