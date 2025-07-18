import z from "zod";

const StageSchema = z.object({
	Id: z.number(),
	Name: z.string(),
	Ordination: z.number(),
	PipelineId: z.number().optional(),
});

type IStage = z.infer<typeof StageSchema>;

export { StageSchema };

export type { IStage };
