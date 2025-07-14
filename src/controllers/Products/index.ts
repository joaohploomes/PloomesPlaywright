import type { IProducts } from "@schemas";
import ProductsService from "@services/Products";
import ProductsGroupsService from "@services/ProductsGroups";
import generateMockedProductsGroups from "../../tests/ProductsGroups/mockedDataProductsGroups/mockedDataProductsGroups";
import type { IUser } from "@types";

class ProductsController {

    private user?: IUser;

    constructor(user?: IUser) {
        this.user = user;
    }

    async findAllProducts(top = 15) {
        const productsService = new ProductsService(this.user);
        const response = await productsService.findAllProducts(top);
        return response;
    };

    async findProductsById(Id: number) {
        const productsService = new ProductsService(this.user);
        const response = await productsService.findProductsById(Id);
        return response;
    };

    async createProducts(data: IProducts) {
        const user = this?.user || undefined;
        const productsService = new ProductsService(user);
        const productsGroupsService = new ProductsGroupsService(user);

        const group = await productsGroupsService.createProductsGroups(generateMockedProductsGroups());

        const dataWithGroup = {
            ...data,
            GroupId: group.Id,
        };
        
        const response = await productsService.createProducts(dataWithGroup);
        return response;
    };

    async updateProducts(product: IProducts, data: Partial<IProducts>) {
        const productsService = new ProductsService(this.user);
        const response = await productsService.updateProducts(product, data);
        return response;
    };

    async deleteProducts(product: IProducts) {
        const productsService = new ProductsService();
        const response = await productsService.deleteProducts(product);

        if (product.GroupId) {
            const productsGroupsService = new ProductsGroupsService(this.user);
            await productsGroupsService.deleteProductsGroups({ Id: product.GroupId });
        };

        return response;
    };
};

export default ProductsController;
