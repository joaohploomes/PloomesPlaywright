import DealsController from "@controllers/Deals";
import { expect, test } from "@playwright/test";
import generateMockedDeal from "../mockedDataDeal/mockedDataDeal";

test.describe("Update Deal", () => {
	test("Update a Deal Correctly", async () => {
		const dealsController = new DealsController();
		const data = generateMockedDeal();
		const deal = await dealsController.createDealWithPipeline(data);
		expect(deal.Id).toBeDefined();

		const updateData = generateMockedDeal();
		const updatedDeal = await dealsController.updateDeal(deal, updateData);
		expect(updatedDeal.Title).toBe(updateData.Title);

		await dealsController.deleteDealAndPipeline(updatedDeal);
	});
});
