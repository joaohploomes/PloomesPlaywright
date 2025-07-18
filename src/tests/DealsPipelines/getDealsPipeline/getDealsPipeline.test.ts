import DealsPipelinesController from "@controllers/DealsPipelines";
import { deleteMultipleItens, generateMultipleItens } from "@lib";
import { expect, test } from "@playwright/test";
import type { IDealssPipelines } from "@schemas";
import generateMockedDealsPipeline from "../mockedDataDealsPipeline/mockedDataDealsPipeline";

test.describe("Get Deals Pipelines", () => {
	test("Get Deals Pipeline Correctly", async () => {
		const dealsPipelinesController = new DealsPipelinesController();
		const data = generateMockedDealsPipeline();
		const dealsPipeline = await dealsPipelinesController.createDealsPipeline(data);
		expect(dealsPipeline.Id).toBeDefined();

		const fetchedDealsPipeline = await dealsPipelinesController.findDealsPipelineById(dealsPipeline.Id);
		expect(fetchedDealsPipeline).toStrictEqual([dealsPipeline]);

		await dealsPipelinesController.deleteDealsPipeline(dealsPipeline);
	});

	test("Get all Deals Pipelines", async () => {
		const dealsPipelinesController = new DealsPipelinesController();
		const dealsPipelines = await generateMultipleItens<IDealssPipelines>(
			dealsPipelinesController.createDealsPipeline.bind(dealsPipelinesController),
			generateMockedDealsPipeline,
			3,
		);
		expect(dealsPipelines).toBeDefined();

		const fetchedDealsPipelines = await dealsPipelinesController.findAllDealsPipelines();
		expect(fetchedDealsPipelines).toBeDefined();
		expect(fetchedDealsPipelines).toMatchArrayId<IDealssPipelines>(dealsPipelines);

		await deleteMultipleItens<IDealssPipelines>(
			dealsPipelinesController.deleteDealsPipeline.bind(dealsPipelinesController),
			dealsPipelines,
		);
	});
});
