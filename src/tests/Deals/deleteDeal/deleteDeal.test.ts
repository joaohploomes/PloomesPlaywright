import DealsController from "@controllers/Deals";
import { expect, test } from "@playwright/test";
import generateMockedDeal from "../mockedDataDeal/mockedDataDeal";

test.describe("Delete Deal", () => {
	test("Delete a Deal Correctly", async () => {
		const dealsController = new DealsController();
		const data = generateMockedDeal();
		const deal = await dealsController.createDealWithPipeline(data);
		expect(deal.Id).toBeDefined();

		await dealsController.deleteDealAndPipeline(deal);
		const deletedDeal = await dealsController.findDealById(deal.Id);
		expect(deletedDeal).toStrictEqual([]);
	});
});
