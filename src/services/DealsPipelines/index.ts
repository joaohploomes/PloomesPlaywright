import { QueryOdata } from "@lib";
import type { APIRequestContext } from "@playwright/test";
import type { IDealsPipelines } from "@schemas";
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

	async findAllPipelines(top: number): Promise<IDealsPipelines[]> {
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

	async createPipeline(pipeline: IDealsPipelines): Promise<IDealsPipelines> {
		const context = await this.auth.createContext();
		const response = await context.post(`${this.endpoint}`, { data: pipeline });
		const json = await response.json();
		return json.value[0];
	}

	async updatePipeline(pipeline: IDealsPipelines, data: Partial<IDealsPipelines>) {
		const context = await this.auth.createContext();
		const response = await context.patch(`${this.endpoint}(${pipeline.Id})`, { data: data });
		const json = await response.json();
		return json.value[0];
	}

	async deletePipeline(pipeline: IDealsPipelines) {
		const context = await this.auth.createContext();
		const response = await context.delete(`${this.endpoint}(${pipeline.Id})`);
		return response;
	}

	async findPipelineById(Id: number): Promise<IDealsPipelines[]> {
		const context = await this.auth.createContext();
		const query = `$filter=Id eq ${Id}`;
		const response = await context.get(`${this.endpoint}?${query}`);
		const json = await response.json();
		return json.value;
	}
}

export default DealsPipelinesService;
