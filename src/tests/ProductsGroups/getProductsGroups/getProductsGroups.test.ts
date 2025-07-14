import ProductsGroupsController from "@controllers/productsGroups";
import { expect, test } from "@playwright/test";
import generateMockedProductsGroups from "../mockedDataProductsGroups/mockedDataProductsGroups";
import { generateMultipleItens, deleteMultipleItens } from "@lib";
import type { IProductsGroups } from "@schemas";

test.describe("Get Products Groups", () => {
    test("Get Products Groups Correctly", async () => {
        const productsGroupsController = new ProductsGroupsController();
        const data = generateMockedProductsGroups();
        const productGroup = await productsGroupsController.createProductsGroups(data);
        expect(productGroup.Id).toBeDefined();

        const foundProductGroup = await productsGroupsController.findProductsGroupsById(productGroup.Id);
        expect(foundProductGroup).toStrictEqual([productGroup]);
    });

    test("Get all Products Groups", async () => {
        const productsGroupsController = new ProductsGroupsController();
        const productsGroups = await generateMultipleItens<IProductsGroups>(productsGroupsController.createProductsGroups.bind(productsGroupsController), generateMockedProductsGroups, 3);
        expect(productsGroups).toBeDefined();

        const fetchedProductsGroups = await productsGroupsController.findAllProductsGroups();
        expect(fetchedProductsGroups).toBeDefined();
        expect(fetchedProductsGroups).toMatchArrayId<IProductsGroups>(productsGroups);

        await deleteMultipleItens<IProductsGroups>(productsGroupsController.deleteProductsGroups.bind(productsGroupsController),productsGroups);
    });
});
