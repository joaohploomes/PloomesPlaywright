import DealsPipelinesController from "@controllers/DealsPipelines";
import { expect, test } from "@playwright/test";
import generateMockedDealsPipeline from "../mockedDataDealsPipeline/mockedDataDealsPipeline";

test.describe("Delete Deals Pipeline", () => {
	test("Delete a deals pipeline correctly", async () => {
		const dealsPipelinesController = new DealsPipelinesController();
		const data = generateMockedDealsPipeline();
		const dealsPipeline = await dealsPipelinesController.createDealsPipeline(data);
		expect(dealsPipeline.Id).toBeDefined();

		await dealsPipelinesController.deleteDealsPipeline(dealsPipeline);
		const deletedDealsPipeline = await dealsPipelinesController.findDealsPipelineById(dealsPipeline.Id);
		expect(deletedDealsPipeline).toStrictEqual([]);
	});
});
