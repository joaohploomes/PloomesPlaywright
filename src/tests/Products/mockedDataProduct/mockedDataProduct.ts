import { faker } from "@faker-js/faker";
import type { IProducts } from "@schemas";

function generateMockedProducts(): IProducts {
    return {
        MeasurementUnit: faker.helpers.arrayElement(["kg", "g", "l", "ml", "un"]),
        Name: faker.commerce.productName(),
        UnitPrice: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
    };
};

export default generateMockedProducts;
