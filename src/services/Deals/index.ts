import type { APIRequestContext } from "@playwright/test";
import type { IDeal } from "@schemas";
import type { IUser } from "@types";
import Authentication from "../../auth/authentication";

class DealService {
	endpoint = "Deals";
	request: APIRequestContext;
	auth = new Authentication();

	constructor(user?: IUser) {
		if (user) {
			this.auth.updateUser(user);
		}
	}

	async findAllDeals() {
		const context = await this.auth.createContext();
		const response = await context.get(this.endpoint);
		const json = await response.json();
		return json.value;
	}

	async createDeal(Deal: IDeal) {
		const context = await this.auth.createContext();
		const response = await context.post(this.endpoint, { data: Deal });
		const json = await response.json();
		return json.value[0];
	}

	async updateDeal(Deal: IDeal, data: Partial<IDeal>) {
		const context = await this.auth.createContext();
		const response = await context.patch(`${this.endpoint}(${Deal.Id})`, { data: data });
		const json = await response.json();
		return json.value[0];
	}

	async deleteDeal(Deal: IDeal) {
		const context = await this.auth.createContext();
		const response = await context.delete(`${this.endpoint}(${Deal.Id})`);
		return response;
	}

	async findDealById(Id: number) {
		const context = await this.auth.createContext();
		const response = await context.get(`${this.endpoint}(${Id})`);
		const json = await response.json();
		return json.value;
	}
}

export default DealService;
