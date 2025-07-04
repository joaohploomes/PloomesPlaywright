import { faker } from "@faker-js/faker";
import type { IDocumentTemplates } from "@schemas";

function generateMockedDocumentTemplates(type: "Quote" | "Order" | "Client Document" | "Deal Document"): IDocumentTemplates {
    let entityId: number;
    let secondaryEntityId: number | undefined;

    switch (type) {
        case "Quote":
            entityId = 7;
            break;
        case "Order":
            entityId = 4;
            break;
        case "Client Document":
            entityId = 66;
            secondaryEntityId = 1;
            break;
        case "Deal Document":
            entityId = 66;
            secondaryEntityId = 2;
            break;
        default:
            throw new Error("Invalid type provided");
    };
    return {
        Name: faker.lorem.words(2),
        EntityId: entityId,
        SecondaryEntityId: secondaryEntityId,
    };
};

export default generateMockedDocumentTemplates;

