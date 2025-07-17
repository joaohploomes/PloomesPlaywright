import type { IDeal } from "@schemas";
import DealsService from "@services/Deals";
import type { IUser } from "@types";

class DealsController {
	private user?: IUser;

	constructor(user?: IUser) {
		this.user = user;
	}

	async findAllDeals(top = 15) {
		const dealsService = new DealsService(this.user);
		const response = await dealsService.findAllDeals(top);
		return response;
	}

	async findDealById(Id: number) {
		const dealsService = new DealsService(this.user);
		const response = await dealsService.findDealById(Id);
		return response;
	}

	async createDeal(data: IDeal) {
		const dealsService = new DealsService(this.user);
		const response = await dealsService.createDeal(data);
		return response;
	}

	async updateDeal(deal: IDeal, data: Partial<IDeal>) {
		const dealsService = new DealsService(this.user);
		const response = await dealsService.updateDeal(deal, data);
		return response;
	}

	async deleteDeal(deal: IDeal) {
		const dealsService = new DealsService(this.user);
		const response = await dealsService.deleteDeal(deal);
		return response;
	}
}

export default DealsController;
