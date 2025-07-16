import type { IDeal } from "@schemas";
import DealService from "@services/Deals";
import type { IUser } from "@types";

class DealController {
	private user?: IUser;

	constructor(user?: IUser) {
		this.user = user;
	}

	async findAllDeals() {
		const dealService = new DealService(this.user);
		const response = await dealService.findAllDeals();
		return response;
	}

	async findDealById(Id: number) {
		const dealService = new DealService(this.user);
		const response = await dealService.findDealById(Id);
		return response;
	}

	async createDeal(data: IDeal) {
		const user = this?.user || undefined;
		const dealService = new DealService(user);
		const response = await dealService.createDeal(data);
		return response;
	}

	async updateDeal(deal: IDeal, data: Partial<IDeal>) {
		const dealService = new DealService(this.user);
		const response = await dealService.updateDeal(deal, data);
		return response;
	}

	async deleteDeal(deal: IDeal) {
		const dealService = new DealService();
		const response = await dealService.deleteDeal(deal);
		const text = await response.text();
	}
}

export default DealController;
