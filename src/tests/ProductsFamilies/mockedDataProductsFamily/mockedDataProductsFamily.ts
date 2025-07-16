import { faker } from "@faker-js/faker";
import type { IProductsFamilies } from "@schemas";

function generateMockedProductsFamilies(): IProductsFamilies {
	return {
		Name: faker.lorem.words(2),
	};
}

export default generateMockedProductsFamilies;
