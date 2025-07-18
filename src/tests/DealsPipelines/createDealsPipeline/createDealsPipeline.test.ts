import DealsPipelinesController from "@controllers/DealsPipelines";
import { expect, test } from "@playwright/test";
import generateMockedDealsPipeline from "../mockedDataDealsPipeline/mockedDataDealsPipeline";

test.describe("Create Deal Pipeline", () => {
	test("Create a Deal Pipeline Correctly", async () => {
		const dealsPipelinesController = new DealsPipelinesController();
		const data = generateMockedDealsPipeline();
		const dealPipeline = await dealsPipelinesController.createDealsPipeline(data);
		expect(dealPipeline.Id).toBeDefined();

		await dealsPipelinesController.deleteDealsPipeline(dealPipeline);
	});
});
