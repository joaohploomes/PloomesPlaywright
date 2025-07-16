import type { IProducts } from "@schemas";
import ProductsService from "@services/Products";
import ProductsGroupsService from "@services/ProductsGroups";
import type { IUser } from "@types";
import generateMockedProductsGroups from "../../tests/ProductsGroups/mockedDataProductsGroup/mockedDataProductsGroup";

class ProductsController {
	private user?: IUser;

	constructor(user?: IUser) {
		this.user = user;
	}

	async findAllProducts(top = 15) {
		const productsService = new ProductsService(this.user);
		const response = await productsService.findAllProducts(top);
		return response;
	}

	async findProductsById(Id: number) {
		const productsService = new ProductsService(this.user);
		const response = await productsService.findProductsById(Id);
		return response;
	}

	async createProduct(data: IProducts) {
		const user = this?.user || undefined;
		const productsService = new ProductsService(user);
		const productsGroupsService = new ProductsGroupsService(user);

		const group = await productsGroupsService.createProductGroup(generateMockedProductsGroups());

		const dataWithGroup = {
			...data,
			GroupId: group.Id,
		};

		const response = await productsService.createProduct(dataWithGroup);
		return response;
	}

	async updateProduct(product: IProducts, data: Partial<IProducts>) {
		const productsService = new ProductsService(this.user);
		const response = await productsService.updateProduct(product, data);
		return response;
	}

	async deleteProduct(product: IProducts) {
		const productsService = new ProductsService();
		const response = await productsService.deleteProduct(product);

		if (product.GroupId) {
			const productsGroupsService = new ProductsGroupsService(this.user);
			await productsGroupsService.deleteProductGroup({ Id: product.GroupId });
		}

		return response;
	}
}

export default ProductsController;
