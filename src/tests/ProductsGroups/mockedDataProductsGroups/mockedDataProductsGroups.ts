import { faker } from "@faker-js/faker";
import type { IProductsGroups } from "@schemas";

function generateMockedProductsGroups(): IProductsGroups {
    return {
        Name: faker.lorem.words(3),
    };
};

export default generateMockedProductsGroups;
