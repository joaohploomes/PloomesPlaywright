import { faker } from "@faker-js/faker";
import type { IDeals } from "@schemas";

function generateMockedDeal(): IDeals {
	return {
		Title: faker.lorem.sentence(),
		Amount: faker.number.float({ fractionDigits: 2, min: 100, max: 100000 }),
	};
}

export default generateMockedDeal;
