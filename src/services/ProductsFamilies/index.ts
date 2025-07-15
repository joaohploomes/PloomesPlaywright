import type { APIRequestContext } from "@playwright/test";
import type { IProductsFamilies } from "@schemas";
import Authentication from "../../auth/authentication";
import type { IUser } from "@types";
import { QueryOdata } from "@lib";

class ProductsFamiliesService {
    endpoint = "Products@Families";
	request: APIRequestContext;
	auth = new Authentication();

    constructor(user?: IUser){
            if(user){
                this.auth.updateUser(user);
            }
        };

    async findAllProductsFamilies(top: number): Promise<IProductsFamilies[]> {
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

    async createProductFamily(ProductsFamilies: IProductsFamilies): Promise<IProductsFamilies> {
        const context = await this.auth.createContext();
        const response = await context.post(`${this.endpoint}`, {data: ProductsFamilies});
        const json = await response.json();
        return json.value[0];
    };

    async updateProductFamily(ProductsFamilies: IProductsFamilies, data: Partial<IProductsFamilies>) {
        const context = await this.auth.createContext();
        const response = await context.patch(`${this.endpoint}(${ProductsFamilies.Id})`, {data: data});
        const json = await response.json();
        return json.value[0];
    };

    async deleteProductFamily(ProductsFamilies: IProductsFamilies) {
        const context = await this.auth.createContext();
        const response = await context.delete(`${this.endpoint}(${ProductsFamilies.Id})`);
        return response;
    };

    async findProductsFamiliesById(Id: number): Promise<IProductsFamilies[]> {
        const context = await this.auth.createContext();
        const query = `$filter=Id eq ${Id}`;
        const response = await context.get(`${this.endpoint}?${query}`);
        const json = await response.json();
        return json.value;
    };
};

export default ProductsFamiliesService;
