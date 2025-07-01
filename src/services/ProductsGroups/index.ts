import type { APIRequestContext } from "@playwright/test";
import type { IProductsGroups } from "@schemas";
import Authentication from "../../auth/authentication";
import type { IUser } from "@types";
import { QueryOdata } from "@lib";

class ProductsGroupsService {
    endpoint = "Products@Groups";
    request: APIRequestContext;
    auth = new Authentication();

    constructor(user?: IUser) {
        if (user) {
            this.auth.updateUser(user);
        }
    }

    async findAllProductsGroups(): Promise<IProductsGroups[]> {
        const context = await this.auth.createContext();
        const odata = new QueryOdata({
            orderBy: { Id: "desc" },
        });
        const query = odata.toString();
        const response = await context.get(`${this.endpoint}?${query}`);
        const json = await response.json();
        return json.value;
    }

    async createProductsGroups(productsGroup: IProductsGroups): Promise<IProductsGroups> {
        const context = await this.auth.createContext();
        const response = await context.post(`${this.endpoint}`, { data: productsGroup });
        const json = await response.json();
        return json.value[0];
    }

    async updateProductsGroups(productsGroup: IProductsGroups, data: Partial<IProductsGroups>) {
        const context = await this.auth.createContext();
        const response = await context.patch(`${this.endpoint}(${productsGroup.Id})`, { data });
        const json = await response.json();
        return json.value[0];
    }

    async deleteProductsGroups(productsGroup: IProductsGroups) {
        const context = await this.auth.createContext();
        const response = await context.delete(`${this.endpoint}(${productsGroup.Id})`);
        return response;
    }

    async findProductsGroupsById(Id: number): Promise<IProductsGroups[]> {
        const context = await this.auth.createContext();
        const query = `$filter=Id eq ${Id}`;
        const response = await context.get(`${this.endpoint}?${query}`);
        const json = await response.json();
        return json.value;
    }
};

export default ProductsGroupsService;
