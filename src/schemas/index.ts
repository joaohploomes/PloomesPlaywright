import { ContactSchema, type IContact } from "./IContact";
import { DealSchema, type IDeal } from "./IDeals";
import { DealsPipelinesSchema, type IDealsPipelines } from "./IDealsPipelines";
import { DocumentTemplateSchema, type IDocumentTemplates } from "./IDocumentTemplates";
import { type IProducts, ProductsSchema } from "./IProducts";
import { type IProductsFamilies, ProductsFamiliesSchema } from "./IProductsFamilies";
import { type IProductsGroups, ProductsGroupsSchema } from "./IProductsGroups";
import { type ITeams, TeamsSchema } from "./ITeams";
import { type IUsers, usersSchema } from "./IUsers";

export {
	ContactSchema,
	DealSchema,
	ProductsFamiliesSchema,
	ProductsGroupsSchema,
	ProductsSchema,
	DocumentTemplateSchema,
	usersSchema,
	TeamsSchema,
	DealsPipelinesSchema,
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
	IDealsPipelines,
};
