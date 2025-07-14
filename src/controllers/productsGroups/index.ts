import type { IProductsGroups } from "@schemas";
import ProductsGroupsService from "@services/ProductsGroups";
import ProductsFamiliesService from "@services/ProductsFamilies";
import generateMockedProductsFamilies from "../../tests/ProductsFamilies/mockedDataProductsFamilies/mockedDataProductsFamilies";
import type { IUser } from "@types";

class ProductsGroupsController {

    private user?: IUser;

    constructor(user?: IUser) {
        this.user = user;
    }

    async findAllProductsGroups(top = 15) {
        const productsGroupsService = new ProductsGroupsService(this.user);
        const response = await productsGroupsService.findAllProductsGroups(top);
        return response;
    };

    async findProductsGroupsById(Id: number) {
        const productsGroupsService = new ProductsGroupsService(this.user);
        const response = await productsGroupsService.findProductsGroupsById(Id);
        return response;
    };

    async createProductsGroups(data: IProductsGroups) {
        const user = this?.user || undefined;
        const productsGroupsService = new ProductsGroupsService(user);
        const productsFamiliesService = new ProductsFamiliesService(user);

        const family = await productsFamiliesService.createProductsFamilies(generateMockedProductsFamilies());

        const dataWithFamily = {
            ...data,
            FamilyId: family.Id,
        };
        
        const response = await productsGroupsService.createProductsGroups(dataWithFamily);
        return response;
    };
    async updateProductsGroups(productsGroup: IProductsGroups, data: Partial<IProductsGroups>) {
        const productsGroupsService = new ProductsGroupsService(this.user);
        const response = await productsGroupsService.updateProductsGroups(productsGroup, data);
        return response;
    };

    async deleteProductsGroups(productsGroup: IProductsGroups) {
        const productsGroupsService = new ProductsGroupsService();
        const response = await productsGroupsService.deleteProductsGroups(productsGroup);

        if (productsGroup.FamilyId) {
            const productsFamiliesService = new ProductsFamiliesService(this.user);
            await productsFamiliesService.deleteProductsFamilies({ Id: productsGroup.FamilyId });
        };

        return response;
    };
};

export default ProductsGroupsController;
