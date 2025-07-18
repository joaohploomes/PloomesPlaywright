import DealsController from "@controllers/Deals";
import DealsPipelinesController from "@controllers/DealsPipelines";
import { deleteMultipleItens, generateMultipleItens } from "@lib";
import { expect, test } from "@playwright/test";
import type { IDeals } from "@schemas";
import generateMockedDealsPipeline from "../../DealsPipelines/mockedDataDealsPipeline/mockedDataDealsPipeline";
import generateMockedDeal from "../mockedDataDeal/mockedDataDeal";

test.describe("Get Deals", () => {
	test("Get Deal Correctly", async () => {
		const dealsController = new DealsController();
		const data = generateMockedDeal();
		const deal = await dealsController.createDealWithPipeline(data);
		expect(deal.Id).toBeDefined();

		const fetchedDeal = await dealsController.findDealById(deal.Id);
		expect(fetchedDeal).toStrictEqual([deal]);

		await dealsController.deleteDealAndPipeline(deal);
	});

	test("Get all Deals", async () => {
		const dealsController = new DealsController();
		const pipelinesController = new DealsPipelinesController();
		const pipelineData = generateMockedDealsPipeline();
		const pipeline = await pipelinesController.createDealsPipeline(pipelineData);

		const deals = await generateMultipleItens<IDeals>(
			() => dealsController.createDealAtPipeline(pipeline.Id, generateMockedDeal()),
			generateMockedDeal,
			3,
		);
		expect(deals).toBeDefined();

		const fetchedDeals = await dealsController.findAllDeals();
		expect(fetchedDeals).toBeDefined();
		expect(fetchedDeals).toMatchArrayId<IDeals>(deals);

		await deleteMultipleItens<IDeals>(dealsController.deleteDealAndPipeline.bind(dealsController), deals);
	});
});
