import ProductsController from "@controllers/Products";
import { deleteMultipleItens, generateMultipleItens } from "@lib";
import { expect, test } from "@playwright/test";
import type { IProducts } from "@schemas";
import generateMockedProducts from "../mockedDataProduct/mockedDataProduct";

test.describe("Get Products", () => {
	test("Get Products Correctly", async () => {
		const productsController = new ProductsController();
		const data = generateMockedProducts();
		const product = await productsController.createProduct(data);
		expect(product.Id).toBeDefined();

		const fetchedProduct = await productsController.findProductsById(product.Id);
		expect(fetchedProduct).toStrictEqual([product]);

		await productsController.deleteProduct(product);
	});

	test("Get all Products", async () => {
		const productsController = new ProductsController();
		const products = await generateMultipleItens<IProducts>(
			productsController.createProduct.bind(productsController),
			generateMockedProducts,
			3,
		);
		expect(products).toBeDefined();

		const fetchedProducts = await productsController.findAllProducts();
		expect(fetchedProducts).toBeDefined();
		expect(fetchedProducts).toMatchArrayId<IProducts>(products);

		await deleteMultipleItens<IProducts>(productsController.deleteProduct.bind(productsController), products);
	});
});
