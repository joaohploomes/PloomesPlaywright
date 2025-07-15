import { type IContact, ContactSchema } from "./IContact";
import { type IDeal, DealSchema } from "./IDeals";
import{ type IProductsFamilies, ProductsFamiliesSchema } from "./IProductsFamilies";
import { type IProductsGroups, ProductsGroupsSchema } from "./IProductsGroups";
import { type IProducts, ProductsSchema } from "./IProducts";
import { type IDocumentTemplates, DocumentTemplateSchema } from "./IDocumentTemplates";
import { type IUsers, usersSchema } from "./IUsers";
import { type ITeams, TeamsSchema } from "./ITeams";

export {
    ContactSchema,
    DealSchema,
    ProductsFamiliesSchema,
    ProductsGroupsSchema,
    ProductsSchema,
    DocumentTemplateSchema,
    usersSchema,
    TeamsSchema,
};

export type {
    IContact,
    IDeal,
    IProductsFamilies,
    IProductsGroups,
    IProducts,
    IDocumentTemplates,
    IUsers,
    ITeams,
};
