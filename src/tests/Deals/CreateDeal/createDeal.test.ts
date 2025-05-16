import DealController from "@controllers/Deals";
import { expect, test } from "@playwright/test";
import generateMockedDeal from "../mockedDataDeal/mockedDataDeal";
import type { IDeal } from "@schemas";
import { generateMultipleItens, deleteMultipleItens } from "@lib";

test.describe("Deal tests", () => {
    test("Create a Deal", async () => {
        const dealController = new DealController();
        const data = generateMockedDeal();
        const deal = await dealController.createDeal(data);

        expect(deal).toBeDefined();
        await dealController.deleteDeal(deal);
    });

    test("Find all Deals", async () => {
        const dealController = new DealController();

        await generateMultipleItens<IDeal>(dealController.createDeal.bind(DealController), generateMockedDeal, 100);

        const deals = await dealController.findAllDeals();
        expect(deals).toBeDefined();

        await deleteMultipleItens<IDeal>(dealController.deleteDeal, [deals]);
    });
});