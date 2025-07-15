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
    };

    async findProductsFamiliesById(Id: number) {
        const productsFamiliesService = new ProductsFamiliesService(this.user);
        const response = await productsFamiliesService.findProductsFamiliesById(Id);
        return response;
    };

    async createProductsFamilies(data: IProductsFamilies) {
        const user = this?.user || undefined;
        const productsFamiliesService = new ProductsFamiliesService(user);
        const response = await productsFamiliesService.createProductsFamilies(data);
        return response;
    };

    async updateProductsFamilies(productsFamily: IProductsFamilies, data: Partial<IProductsFamilies>) {
        const productsFamiliesService = new ProductsFamiliesService(this.user);
        const response = await productsFamiliesService.updateProductsFamilies(productsFamily, data);
        return response;
    };

    async deleteProductsFamilies(productsFamily: IProductsFamilies) {
        const productsFamiliesService = new ProductsFamiliesService();
        const response = await productsFamiliesService.deleteProductsFamilies(productsFamily);
        return response;
    };
};

export default ProductsFamiliesController;
