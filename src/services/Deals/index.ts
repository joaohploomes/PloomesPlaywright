import { QueryOdata } from "@lib";
import type { APIRequestContext } from "@playwright/test";
import type { IDeals } from "@schemas";
import type { IUser } from "@types";
import Authentication from "../../auth/authentication";

class DealsService {
	endpoint = "Deals";
	request: APIRequestContext;
	auth = new Authentication();

	constructor(user?: IUser) {
		if (user) {
			this.auth.updateUser(user);
		}
	}

	async findAllDeals(top: number): Promise<IDeals[]> {
		const context = await this.auth.createContext();
		const odata = new QueryOdata({
			orderBy: { Id: "desc" },
			top: top,
		});
		const query = odata.toString();
		const response = await context.get(`${this.endpoint}?${query}`);
		const json = await response.json();
		return json.value;
	}

	async createDeal(deal: IDeals): Promise<IDeals> {
		const context = await this.auth.createContext();
		const response = await context.post(`${this.endpoint}`, { data: deal });
		const json = await response.json();
		return json.value[0];
	}

	async updateDeal(deal: IDeals, data: Partial<IDeals>) {
		const context = await this.auth.createContext();
		const response = await context.patch(`${this.endpoint}(${deal.Id})`, { data: data });
		const json = await response.json();
		return json.value[0];
	}

	async deleteDeal(deal: IDeals) {
		const context = await this.auth.createContext();
		const response = await context.delete(`${this.endpoint}(${deal.Id})`);
		return response;
	}

	async findDealById(Id: number): Promise<IDeals[]> {
		const context = await this.auth.createContext();
		const query = `$filter=Id eq ${Id}`;
		const response = await context.get(`${this.endpoint}?${query}`);
		const json = await response.json();
		return json.value;
	}
}

export default DealsService;
