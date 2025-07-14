import type { APIRequestContext } from "@playwright/test";
import type { IProducts } from "@schemas";
import Authentication from "../../auth/authentication";
import type { IUser } from "@types";
import { QueryOdata } from "@lib";

class ProductsService {
    endpoint = "Products";
    request: APIRequestContext;
    auth = new Authentication();

    constructor(user?: IUser){
            if(user){
                this.auth.updateUser(user);
            }
        };

    async findAllProducts(top: number): Promise<IProducts[]> {
        const context = await this.auth.createContext();
        const odata = new QueryOdata({
            orderBy: { Id : "desc" },
            top: top,
        });
        const query = odata.toString();
        const response = await context.get(`${this.endpoint}?${query}`);
        const json = await response.json();
        return json.value;
    };

    async createProducts(product: IProducts): Promise<IProducts> {
        const context = await this.auth.createContext();
        const response = await context.post(`${this.endpoint}`, {data: product});
        const json = await response.json();
        return json.value[0];
    };

    async updateProducts(product: IProducts, data: Partial<IProducts>) {
        const context = await this.auth.createContext();
        const response = await context.patch(`${this.endpoint}(${product.Id})`, {data: data});
        const json = await response.json();
        return json.value[0];
    };

    async deleteProducts(product: IProducts) {
        const context = await this.auth.createContext();
        const response = await context.delete(`${this.endpoint}(${product.Id})`);
        return response;
    };

    async findProductsById(Id: number): Promise<IProducts[]> {
        const context = await this.auth.createContext();
        const query = `$filter=Id eq ${Id}`;
        const response = await context.get(`${this.endpoint}?${query}`);
        const json = await response.json();
        return json.value;
    };
};

export default ProductsService;
