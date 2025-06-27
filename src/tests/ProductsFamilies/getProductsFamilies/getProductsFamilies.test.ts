import ProductsFamiliesController from "@controllers/ProductsFamilies";
import { expect, test } from "@playwright/test";
import generateMockedProductsFamilies from "../mockedDataProductsFamilies/mockedDataProductsFamilies";
import { generateMultipleItens, deleteMultipleItens } from "@lib";
import type { IProductsFamilies } from "@schemas";

test.describe("Get Products Families", () => {
    test("Get Products Families Correctly", async () => {
        const productsFamiliesController = new ProductsFamiliesController();
        const data = generateMockedProductsFamilies();
        const productFamily = await productsFamiliesController.createProductsFamilies(data);
        expect(productFamily.Id).toBeDefined();

        const foundProductFamily = await productsFamiliesController.findProductsFamiliesById(productFamily.Id);
        expect(foundProductFamily).toStrictEqual([productFamily]);
    });

    test("Get all Products Families", async () => {
        const productsFamiliesController = new ProductsFamiliesController();
        const productsFamilies = await generateMultipleItens<IProductsFamilies>(productsFamiliesController.createProductsFamilies.bind(ProductsFamiliesController), generateMockedProductsFamilies, 3);
        expect(productsFamilies).toBeDefined();

        const fetchedProductsFamilies = await productsFamiliesController.findAllProductsFamilies();
        expect(fetchedProductsFamilies).toBeDefined();
        expect(fetchedProductsFamilies).toMatchArrayId<IProductsFamilies>(productsFamilies);

        await deleteMultipleItens<IProductsFamilies>(productsFamiliesController.deleteProductsFamilies, fetchedProductsFamilies);
    });
});
