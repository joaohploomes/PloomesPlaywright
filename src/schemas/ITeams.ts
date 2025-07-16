import z from "zod";

const TeamsSchema = z.object({
	Id: z.number(),
	Name: z.string(),
	Users: z.array(z.object({})),
});

type ITeams = z.infer<typeof TeamsSchema>;

export { TeamsSchema };

export type { ITeams };
