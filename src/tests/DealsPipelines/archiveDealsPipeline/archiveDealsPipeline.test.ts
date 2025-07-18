import DealsPipelinesController from "@controllers/DealsPipelines";
import { expect, test } from "@playwright/test";
import generateMockedDealsPipeline from "../mockedDataDealsPipeline/mockedDataDealsPipeline";

test.describe("Archive Deal Pipeline", () => {
	test("Archive a Deal Pipeline Correctly", async () => {
		const dealsPipelinesController = new DealsPipelinesController();
		const data = generateMockedDealsPipeline();
		const dealPipeline = await dealsPipelinesController.createDealsPipeline(data);
		expect(dealPipeline.Id).toBeDefined();

		const archivedDealPipeline = await dealsPipelinesController.archiveDealsPipeline(dealPipeline);
		expect(archivedDealPipeline.Archived).toBe(true);

		await dealsPipelinesController.deleteDealsPipeline(archivedDealPipeline);
	});

	test("Unarchive a Deal Pipeline Correctly", async () => {
		const dealsPipelinesController = new DealsPipelinesController();
		const data = generateMockedDealsPipeline();
		const dealPipeline = await dealsPipelinesController.createDealsPipeline(data);
		expect(dealPipeline.Id).toBeDefined();

		const archivedDealPipeline = await dealsPipelinesController.archiveDealsPipeline(dealPipeline);
		expect(archivedDealPipeline.Archived).toBe(true);

		const unarchivedDealPipeline = await dealsPipelinesController.unarchiveDealsPipeline(archivedDealPipeline);
		expect(unarchivedDealPipeline.Archived).toBe(false);

		await dealsPipelinesController.deleteDealsPipeline(unarchivedDealPipeline);
	});
});
