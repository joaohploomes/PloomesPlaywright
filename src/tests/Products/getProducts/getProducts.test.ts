import ProductsController from "@controllers/Products";
import { test, expect } from "@playwright/test";
import generateMockedProducts from "../mockedDataProducts/mockedDataProducts";
import { generateMultipleItens, deleteMultipleItens } from "@lib";
import type { IProducts } from "@schemas";

test.describe("Get Products", () => {
    test("Get Products Correctly", async () => {
        const productsController = new ProductsController();
        const data = generateMockedProducts();
        const product = await productsController.createProducts(data);
        expect(product.Id).toBeDefined();

        const foundProduct = await productsController.findProductsById(product.Id);
        expect(foundProduct).toStrictEqual([product]);
    });

    test("Get all Products", async () => {
        const productsController = new ProductsController();
        const products = await generateMultipleItens<IProducts>(productsController.createProducts.bind(productsController), generateMockedProducts, 3);
        expect(products).toBeDefined();

        const fetchedProducts = await productsController.findAllProducts();
        expect(fetchedProducts).toBeDefined();
        expect(fetchedProducts).toMatchArrayId<IProducts>(products);

        await deleteMultipleItens<IProducts>(productsController.deleteProducts.bind(productsController), fetchedProducts);
    });
});
