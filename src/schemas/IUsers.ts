import z from "zod";

const usersSchema = z.object({
	Id: z.number(),
	Name: z.string(),
	Email: z.string().email(),
	RoleId: z.number().nullable().optional(),
	ProfileId: z.number(),
	Suspended: z.boolean().optional(),
	Teams: z.array(z.object({})).optional(),
});

type IUsers = z.infer<typeof usersSchema>;

export { usersSchema };

export type { IUsers };
