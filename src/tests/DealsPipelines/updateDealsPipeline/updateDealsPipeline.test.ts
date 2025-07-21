import DealsPipelinesController from "@controllers/DealsPipelines";
import { expect, test } from "@playwright/test";
import generateMockedDealsPipeline from "../mockedDataDealsPipeline/mockedDataDealsPipeline";

test.describe("Update Deal Pipeline", () => {
	test("Update a Deal Pipeline Correctly", async () => {
		const dealsPipelinesController = new DealsPipelinesController();
		const data = generateMockedDealsPipeline();
		const dealPipeline = await dealsPipelinesController.createDealsPipeline(data);
		expect(dealPipeline.Id).toBeDefined();

		const updateData = generateMockedDealsPipeline();
		const updatedDealPipeline = await dealsPipelinesController.updateDealsPipeline(dealPipeline, updateData);
		expect(updatedDealPipeline.Name).toBe(updateData.Name);

		await dealsPipelinesController.deleteDealsPipeline(updatedDealPipeline);
	});
});
