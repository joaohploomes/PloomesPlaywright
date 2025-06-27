import ProductsFamiliesController from "@controllers/ProductsFamilies";
import { expect, test } from "@playwright/test";
import generateMockedProductsFamilies from "../mockedDataProductsFamilies/mockedDataProductsFamilies";

test.describe("Get Products Families", () => {
    test("Get Products Families Correctly", async () => {
        const productsFamiliesController = new ProductsFamiliesController();
        const data = generateMockedProductsFamilies();
        const productFamily = await productsFamiliesController.createProductsFamilies(data);
        expect(productFamily.Id).toBeDefined();

        const foundProductFamily = await productsFamiliesController.findProductsFamiliesById(productFamily.Id);
        expect(foundProductFamily).toStrictEqual([productFamily]);
    });
});
