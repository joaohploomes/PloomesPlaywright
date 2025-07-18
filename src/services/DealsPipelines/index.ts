import { QueryOdata } from "@lib";
import type { APIRequestContext } from "@playwright/test";
import type { IDealssPipelines, IStage } from "@schemas";
import type { IUser } from "@types";
import Authentication from "../../auth/authentication";

class DealsPipelinesService {
	endpoint = "Deals@Pipelines";
	request: APIRequestContext;
	auth = new Authentication();

	constructor(user?: IUser) {
		if (user) {
			this.auth.updateUser(user);
		}
	}

	async findAllPipelines(top: number): Promise<IDealssPipelines[]> {
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

	async createPipeline(pipeline: IDealssPipelines): Promise<IDealssPipelines> {
		const context = await this.auth.createContext();
		const response = await context.post(`${this.endpoint}`, { data: pipeline });
		const json = await response.json();
		return json.value[0];
	}

	async updatePipeline(pipeline: IDealssPipelines, data: Partial<IDealssPipelines>) {
		const context = await this.auth.createContext();
		const response = await context.patch(`${this.endpoint}(${pipeline.Id})`, { data: data });
		const json = await response.json();
		return json.value[0];
	}

	async deletePipeline(pipeline: IDealssPipelines) {
		const context = await this.auth.createContext();
		const response = await context.delete(`${this.endpoint}(${pipeline.Id})`);
		return response;
	}

	async findPipelineById(Id: number): Promise<IDealssPipelines[]> {
		const context = await this.auth.createContext();
		const query = `$filter=Id eq ${Id}`;
		const response = await context.get(`${this.endpoint}?${query}`);
		const json = await response.json();
		return json.value;
	}

	async findStagesByPipelineId(pipelineId: number): Promise<IStage[]> {
		const context = await this.auth.createContext();
		const query = `$filter=PipelineId eq ${pipelineId}`;
		const response = await context.get(`/Deals@Stages?${query}`);
		const json = await response.json();
		return json.value as IStage[];
	}
}

export default DealsPipelinesService;
