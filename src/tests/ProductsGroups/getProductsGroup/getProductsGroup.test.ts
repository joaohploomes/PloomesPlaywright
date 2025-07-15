import ProductsGroupsController from "@controllers/ProductsGroups";
import { expect, test } from "@playwright/test";
import generateMockedProductsGroups from "../mockedDataProductsGroup/mockedDataProductsGroup";
import { generateMultipleItens, deleteMultipleItens } from "@lib";
import type { IProductsGroups } from "@schemas";

test.describe("Get Products Groups", () => {
    test("Get Products Groups Correctly", async () => {
        const productsGroupsController = new ProductsGroupsController();
        const data = generateMockedProductsGroups();
        const productGroup = await productsGroupsController.createProductGroup(data);
        expect(productGroup.Id).toBeDefined();

        const fetchedProductGroup = await productsGroupsController.findProductsGroupsById(productGroup.Id);
        expect(fetchedProductGroup).toStrictEqual([productGroup]);

        await productsGroupsController.deleteProductGroup(productGroup);
    });

    test("Get all Products Groups", async () => {
        const productsGroupsController = new ProductsGroupsController();
        const productsGroups = await generateMultipleItens<IProductsGroups>(productsGroupsController.createProductGroup.bind(productsGroupsController), generateMockedProductsGroups, 3);
        expect(productsGroups).toBeDefined();

        const fetchedProductsGroups = await productsGroupsController.findAllProductsGroups();
        expect(fetchedProductsGroups).toBeDefined();
        expect(fetchedProductsGroups).toMatchArrayId<IProductsGroups>(productsGroups);

        await deleteMultipleItens<IProductsGroups>(productsGroupsController.deleteProductGroup.bind(productsGroupsController),productsGroups);
    });
});
