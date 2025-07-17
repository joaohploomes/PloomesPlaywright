import type { IDealsPipelines } from "@schemas";
import DealsPipelinesService from "@services/DealsPipelines";
import type { IUser } from "@types";

class DealsPipelinesController {
	private user?: IUser;

	constructor(user?: IUser) {
		this.user = user;
	}

	async findAllDealsPipelines(top = 15) {
		const dealsPipelinesService = new DealsPipelinesService(this.user);
		const response = await dealsPipelinesService.findAllPipelines(top);
		return response;
	}

	async findDealsPipelineById(Id: number) {
		const dealsPipelinesService = new DealsPipelinesService(this.user);
		const response = await dealsPipelinesService.findPipelineById(Id);
		return response;
	}

	async createDealsPipeline(data: IDealsPipelines) {
		const dealsPipelinesService = new DealsPipelinesService(this.user);
		const response = await dealsPipelinesService.createPipeline(data);
		return response;
	}

	async updateDealsPipeline(pipeline: IDealsPipelines, data: Partial<IDealsPipelines>) {
		const dealsPipelinesService = new DealsPipelinesService(this.user);
		const response = await dealsPipelinesService.updatePipeline(pipeline, data);
		return response;
	}

	async deleteDealsPipeline(pipeline: IDealsPipelines) {
		const dealsPipelinesService = new DealsPipelinesService(this.user);
		const response = await dealsPipelinesService.deletePipeline(pipeline);
		return response;
	}

	async archiveDealsPipeline(pipeline: IDealsPipelines) {
		const dealsPipelinesService = new DealsPipelinesService(this.user);
		const data = { Archived: true };
		const response = await dealsPipelinesService.updatePipeline(pipeline, data);
		return response;
	}

	async unarchiveDealsPipeline(pipeline: IDealsPipelines) {
		const dealsPipelinesService = new DealsPipelinesService(this.user);
		const data = { Archived: false };
		const response = await dealsPipelinesService.updatePipeline(pipeline, data);
		return response;
	}
}

export default DealsPipelinesController;
