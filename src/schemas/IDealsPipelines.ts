import z from "zod";

const DealsPipelinesSchema = z.object({
	Id: z.number(),
	Archived: z.boolean(),
	Name: z.string(),
	Color: z.string(),
	ForbiddenStageReturn: z.boolean().optional(),
	GenderId: z.number(),
	IconId: z.number(),
	LoseButtonId: z.number(),
	LoseVerbId: z.number(),
	MayCreateDocuments: z.boolean(),
	MayCreateOrders: z.boolean(),
	MayCreateQuotes: z.boolean(),
	MayLoseDeals: z.boolean(),
	MayWinDeals: z.boolean(),
	MustPassAllStages: z.boolean(),
	WinButtonId: z.number(),
	WinDealOnLastStage: z.boolean(),
	WinVerbId: z.number(),
	Stages: z.array(z.object({})),
	SingularUnitName: z.string().optional(),
	PluralUnitName: z.string().optional(),
});

type IDealsPipelines = z.infer<typeof DealsPipelinesSchema>;

export { DealsPipelinesSchema };

export type { IDealsPipelines };
