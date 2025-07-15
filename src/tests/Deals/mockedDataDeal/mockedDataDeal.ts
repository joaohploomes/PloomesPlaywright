import { Faker, faker } from "@faker-js/faker";
import type { IDeal } from "@schemas";

function generateMockedDeal(): IDeal {
	return {
		Title: faker.lorem.sentence(),
		Amount: faker.number.int(),
	};
}

export default generateMockedDeal;
