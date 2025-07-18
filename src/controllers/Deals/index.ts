import DealsPipelinesController from "@controllers/DealsPipelines";
import type { IDeals } from "@schemas";
import DealsService from "@services/Deals";
import type { IUser } from "@types";
import generateMockedDealsPipeline from "../../tests/DealsPipelines/mockedDataDealsPipeline/mockedDataDealsPipeline";

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

	async createDealWithPipeline(data: IDeals) {
		const dealsService = new DealsService(this.user);
		const dealsPipelinesController = new DealsPipelinesController(this.user);

		const pipelineData = generateMockedDealsPipeline();
		const pipeline = await dealsPipelinesController.createDealsPipeline(pipelineData);

		const stages = await dealsPipelinesController.findStagesFromPipeline(pipeline.Id);
		const stageId = stages[0].Id;

		const dataWithStage = {
			...data,
			StageId: stageId,
		};

		const response = await dealsService.createDeal(dataWithStage);
		return response;
	}

	async createDealAtStage(stageId: number, data: IDeals) {
		const dealsService = new DealsService(this.user);

		const dataWithStage = {
			...data,
			StageId: stageId,
		};

		const response = await dealsService.createDeal(dataWithStage);
		return response;
	}

	async createDealAtPipeline(pipelineId: number, data: IDeals) {
		const dealsService = new DealsService(this.user);
		const dealsPipelinesController = new DealsPipelinesController(this.user);

		const stages = await dealsPipelinesController.findStagesFromPipeline(pipelineId);

		if (!stages?.length) {
			throw new Error(`Pipeline ${pipelineId} não possui estágios.`);
		}

		const randomStageId = stages[Math.floor(Math.random() * stages.length)].Id;

		const dataWithStage = {
			...data,
			StageId: randomStageId,
		};

		return await dealsService.createDeal(dataWithStage);
	}

	async updateDeal(deal: IDeals, data: Partial<IDeals>) {
		const dealsService = new DealsService(this.user);
		const response = await dealsService.updateDeal(deal, data);
		return response;
	}

	async deleteDealAndPipeline(deal: IDeals) {
		const dealsService = new DealsService(this.user);
		const response = await dealsService.deleteDeal(deal);

		if (deal.PipelineId) {
			const dealsPipelinesController = new DealsPipelinesController(this.user);
			await dealsPipelinesController.deleteDealsPipeline({ Id: deal.PipelineId });
		}

		return response;
	}

	async deleteDeal(deal: IDeals) {
		const dealsService = new DealsService(this.user);
		const response = await dealsService.deleteDeal(deal);
		return response;
	}
}

export default DealsController;
