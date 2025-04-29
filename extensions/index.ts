import { expect } from "@playwright/test";
import toMatchSchema from "./toMatchSchema";

expect.extend({
    toMatchSchema,
})