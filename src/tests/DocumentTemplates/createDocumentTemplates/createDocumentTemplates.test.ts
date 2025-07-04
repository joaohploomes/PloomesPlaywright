import DocumentTemplatesController from "@controllers/DocumentTemplates";
import { expect, test } from "@playwright/test";
import generateMockedDocumentTemplates from "../mockedDataDocumentTemplates/mockedDataDocumentTemplates";

test.describe("Create Document Templates", () => {
    test("Create a Quote Template Correctly", async () => {
        const documentTemplatesController = new DocumentTemplatesController();
        const data = generateMockedDocumentTemplates("Quote");
        const documentTemplate = await documentTemplatesController.createDocumentTemplates(data);

        expect(documentTemplate.Id).toBeDefined();

        await documentTemplatesController.deleteDocumentTemplates(documentTemplate);
    });

    test("Create a Order Template Correctly", async () => {
        const documentTemplatesController = new DocumentTemplatesController();
        const data = generateMockedDocumentTemplates("Order");
        const documentTemplate = await documentTemplatesController.createDocumentTemplates(data);

        expect(documentTemplate.Id).toBeDefined();

        await documentTemplatesController.deleteDocumentTemplates(documentTemplate);
    });

    test("Create a Document Template Correctly", async () => {
        const documentTemplatesController = new DocumentTemplatesController();
        const data = generateMockedDocumentTemplates("Document");
        const documentTemplate = await documentTemplatesController.createDocumentTemplates(data);

        expect(documentTemplate.Id).toBeDefined();

        await documentTemplatesController.deleteDocumentTemplates(documentTemplate);
    });
});
