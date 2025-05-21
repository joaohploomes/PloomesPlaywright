import { expect } from "@playwright/test";
import toMatchSchema from "./toMatchSchema";
import toMatchArrayId from "./toMatchArrayId";

expect.extend({
    toMatchSchema,
    toMatchArrayId
})