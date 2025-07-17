import { faker } from "@faker-js/faker";
import type { IDeal } from "@schemas";

function generateMockedDeal(): IDeal {
	return {
		Title: faker.lorem.sentence(),
		Amount: faker.number.float({ fractionDigits: 2, min: 100, max: 100000 }),
	};
}

export default generateMockedDeal;
