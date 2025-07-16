import type { IProductsFamilies } from "@schemas";
import ProductsFamiliesService from "@services/ProductsFamilies";
import type { IUser } from "@types";

class ProductsFamiliesController {
	private user?: IUser;

	constructor(user?: IUser) {
		this.user = user;
	}

	async findAllProductsFamilies(top = 15) {
		const productsFamiliesService = new ProductsFamiliesService(this.user);
		const response = await productsFamiliesService.findAllProductsFamilies(top);
		return response;
	}

	async findProductsFamiliesById(Id: number) {
		const productsFamiliesService = new ProductsFamiliesService(this.user);
		const response = await productsFamiliesService.findProductsFamiliesById(Id);
		return response;
	}

	async createProductFamily(data: IProductsFamilies) {
		const user = this?.user || undefined;
		const productsFamiliesService = new ProductsFamiliesService(user);
		const response = await productsFamiliesService.createProductFamily(data);
		return response;
	}

	async updateProductFamily(productsFamily: IProductsFamilies, data: Partial<IProductsFamilies>) {
		const productsFamiliesService = new ProductsFamiliesService(this.user);
		const response = await productsFamiliesService.updateProductFamily(productsFamily, data);
		return response;
	}

	async deleteProductFamily(productsFamily: IProductsFamilies) {
		const productsFamiliesService = new ProductsFamiliesService();
		const response = await productsFamiliesService.deleteProductFamily(productsFamily);
		return response;
	}
}

export default ProductsFamiliesController;
