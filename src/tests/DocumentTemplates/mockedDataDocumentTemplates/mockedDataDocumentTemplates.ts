import { faker } from "@faker-js/faker";
import type { IDocumentTemplates } from "@schemas";

function generateMockedDocumentTemplates(type: "Quote" | "Order" | "Document"): IDocumentTemplates {
    let entityId: number;

    switch (type) {
        case "Quote":
            entityId = 7;
            break;
        case "Order":
            entityId = 4;
            break;
        case "Document":
            entityId = 66;
            break;
        default:
            throw new Error("Invalid type provided");
    };
    return {
        Name: faker.lorem.words(2),
        EntityId: entityId,
    };
};

export default generateMockedDocumentTemplates;

