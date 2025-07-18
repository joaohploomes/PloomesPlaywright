import { ContactSchema, type IContact } from "./IContact";
import { DealSchema, type IDeals } from "./IDealss";
import { DealsPipelinesSchema, type IDealssPipelines } from "./IDealssPipelines";
import { DocumentTemplateSchema, type IDocumentTemplates } from "./IDocumentTemplates";
import { type IProducts, ProductsSchema } from "./IProducts";
import { type IProductsFamilies, ProductsFamiliesSchema } from "./IProductsFamilies";
import { type IProductsGroups, ProductsGroupsSchema } from "./IProductsGroups";
import { type IStage, StageSchema } from "./IStage";
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
	StageSchema,
};

export type {
	IContact,
	IDeals,
	IProductsFamilies,
	IProductsGroups,
	IProducts,
	IDocumentTemplates,
	IUsers,
	ITeams,
	IDealssPipelines,
	IStage,
};
