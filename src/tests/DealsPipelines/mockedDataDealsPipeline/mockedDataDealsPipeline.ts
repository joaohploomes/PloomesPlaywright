import { faker } from "@faker-js/faker";
import type { IDealsPipelines } from "@schemas";

function generateMockedDealsPipeline(nStages = 3): IDealsPipelines {
	const stages = [];
	for (let i = 0; i < nStages; i++) {
		stages.push({
			Name: faker.lorem.words(2),
			Ordination: i,
		});
	}

	return {
		Name: faker.lorem.words(3),
		Color: faker.color.rgb(),
		Stages: stages,
		SingularUnitName: faker.lorem.word(),
		PluralUnitName: faker.lorem.word(),
		GenderId: faker.number.int({ min: 1, max: 2 }),
		IconId: faker.number.int({ min: 1, max: 201 }),
	};
}

export default generateMockedDealsPipeline;
