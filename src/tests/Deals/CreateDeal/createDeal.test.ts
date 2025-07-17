import DealsController from "@controllers/Deals";
import { expect, test } from "@playwright/test";
import generateMockedDeal from "../mockedDataDeal/mockedDataDeal";

test.describe("Create Deal", () => {
	test("Create a Deal Correctly", async () => {
		const dealsController = new DealsController();
		const data = generateMockedDeal();
		const deal = await dealsController.createDeal(data);
		expect(deal.Id).toBeDefined();

		await dealsController.deleteDeal(deal);
	});
});
