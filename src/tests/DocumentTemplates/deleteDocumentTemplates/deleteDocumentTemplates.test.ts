import DocumentTemplatesController from "@controllers/DocumentTemplates";
import { expect, test } from "@playwright/test";
import generateMockedDocumentTemplates from "../mockedDataDocumentTemplates/mockedDataDocumentTemplates";

test.describe("Delete Document Templates", () => {
    test("Delete a Document Template Correctly", async () => {
        const documentTemplatesController = new DocumentTemplatesController();
        const data = generateMockedDocumentTemplates("Quote");
        const documentTemplate = await documentTemplatesController.createDocumentTemplates(data);
        expect(documentTemplate.Id).toBeDefined();

        await documentTemplatesController.deleteDocumentTemplates(documentTemplate);
        const deletedDocumentTemplate = await documentTemplatesController.findDocumentTemplatesById(documentTemplate.Id);
        expect(deletedDocumentTemplate).toStrictEqual([]);
    });
});
