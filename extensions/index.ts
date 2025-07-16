import { expect } from "@playwright/test";
import toMatchArrayId from "./toMatchArrayId";
import toMatchSchema from "./toMatchSchema";

expect.extend({
	toMatchSchema,
	toMatchArrayId,
});
