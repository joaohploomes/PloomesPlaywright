import { faker } from "@faker-js/faker";
import type { IDealssPipelines } from "@schemas";

function generateMockedDealsPipeline(nStages = 3): IDealssPipelines {
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
		EnableFunnelViewMode: true,
		EnableTableViewMode: true,
	};
}

export default generateMockedDealsPipeline;
