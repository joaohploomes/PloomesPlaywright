import DocumentTemplatesController from "@controllers/DocumentTemplates";
import { expect, test } from "@playwright/test";
import generateMockedDocumentTemplates from "../mockedDataDocumentTemplate/mockedDataDocumentTemplate";

test.describe("Delete Document Templates", () => {
    test("Delete a Document Template Correctly", async () => {
        const documentTemplatesController = new DocumentTemplatesController();
        const data = generateMockedDocumentTemplates("Quote");
        const documentTemplate = await documentTemplatesController.createDocumentTemplate(data);
        expect(documentTemplate.Id).toBeDefined();

        await documentTemplatesController.deleteDocumentTemplate(documentTemplate);
        const deletedDocumentTemplate = await documentTemplatesController.findDocumentTemplateById(documentTemplate.Id);
        expect(deletedDocumentTemplate).toStrictEqual([]);
    });
});
