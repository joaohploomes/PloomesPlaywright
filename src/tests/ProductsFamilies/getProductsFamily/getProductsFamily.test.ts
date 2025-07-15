import ProductsFamiliesController from "@controllers/ProductsFamilies";
import { deleteMultipleItens, generateMultipleItens } from "@lib";
import { expect, test } from "@playwright/test";
import type { IProductsFamilies } from "@schemas";
import generateMockedProductsFamilies from "../mockedDataProductsFamily/mockedDataProductsFamily";

test.describe("Get Products Families", () => {
	test("Get Products Families Correctly", async () => {
		const productsFamiliesController = new ProductsFamiliesController();
		const data = generateMockedProductsFamilies();
		const productFamily = await productsFamiliesController.createProductFamily(data);
		expect(productFamily.Id).toBeDefined();

		const fetchedProductFamily = await productsFamiliesController.findProductsFamiliesById(productFamily.Id);
		expect(fetchedProductFamily).toStrictEqual([productFamily]);

		await productsFamiliesController.deleteProductFamily(productFamily);
	});

	test("Get all Products Families", async () => {
		const productsFamiliesController = new ProductsFamiliesController();
		const productsFamilies = await generateMultipleItens<IProductsFamilies>(
			productsFamiliesController.createProductFamily.bind(productsFamiliesController),
			generateMockedProductsFamilies,
			3,
		);
		expect(productsFamilies).toBeDefined();

		const fetchedProductsFamilies = await productsFamiliesController.findAllProductsFamilies();
		expect(fetchedProductsFamilies).toBeDefined();
		expect(fetchedProductsFamilies).toMatchArrayId<IProductsFamilies>(productsFamilies);

		await deleteMultipleItens<IProductsFamilies>(
			productsFamiliesController.deleteProductFamily.bind(productsFamiliesController),
			productsFamilies,
		);
	});
});
