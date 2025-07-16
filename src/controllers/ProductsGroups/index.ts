import type { IProductsGroups } from "@schemas";
import ProductsFamiliesService from "@services/ProductsFamilies";
import ProductsGroupsService from "@services/ProductsGroups";
import type { IUser } from "@types";
import generateMockedProductsFamilies from "../../tests/ProductsFamilies/mockedDataProductsFamily/mockedDataProductsFamily";

class ProductsGroupsController {
	private user?: IUser;

	constructor(user?: IUser) {
		this.user = user;
	}

	async findAllProductsGroups(top = 15) {
		const productsGroupsService = new ProductsGroupsService(this.user);
		const response = await productsGroupsService.findAllProductsGroups(top);
		return response;
	}

	async findProductsGroupsById(Id: number) {
		const productsGroupsService = new ProductsGroupsService(this.user);
		const response = await productsGroupsService.findProductsGroupsById(Id);
		return response;
	}

	async createProductGroup(data: IProductsGroups) {
		const user = this?.user || undefined;
		const productsGroupsService = new ProductsGroupsService(user);
		const productsFamiliesService = new ProductsFamiliesService(user);

		const family = await productsFamiliesService.createProductFamily(generateMockedProductsFamilies());

		const dataWithFamily = {
			...data,
			FamilyId: family.Id,
		};

		const response = await productsGroupsService.createProductGroup(dataWithFamily);
		return response;
	}
	async updateProductGroup(productsGroup: IProductsGroups, data: Partial<IProductsGroups>) {
		const productsGroupsService = new ProductsGroupsService(this.user);
		const response = await productsGroupsService.updateProductGroup(productsGroup, data);
		return response;
	}

	async deleteProductGroup(productsGroup: IProductsGroups) {
		const productsGroupsService = new ProductsGroupsService();
		const response = await productsGroupsService.deleteProductGroup(productsGroup);

		if (productsGroup.FamilyId) {
			const productsFamiliesService = new ProductsFamiliesService(this.user);
			await productsFamiliesService.deleteProductFamily({ Id: productsGroup.FamilyId });
		}

		return response;
	}
}

export default ProductsGroupsController;
