import z from "zod";

const ContactSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string().email()
})

type IContact = z.infer<typeof ContactSchema>;

export {
	ContactSchema
};

export type {
	IContact
};