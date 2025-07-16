import DealController from "@controllers/Deals";
import { expect, test } from "@playwright/test";
import generateMockedDeal from "../mockedDataDeal/mockedDataDeal";

// test.describe("Deal Tests", () => {
//     test("Updates a Deal", async () => {
//         const dealController = new DealController();
//         const data = generateMockedDeal();
//         const deal = await dealController.createDeal(data);

//         expect(deal).toBeDefined();

//         const dataUpdate = generateMockedDeal();
//         const updatedDeal = await dealController.updateDeal(deal, dataUpdate);

//         expect(updatedDeal).toBeDefined();

//         expect(updatedDeal.Title).toBe(dataUpdate.Title);
//         await dealController.deleteDeal(updatedDeal);
//     });
// });
