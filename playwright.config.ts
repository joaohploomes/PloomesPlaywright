import { defineConfig } from "@playwright/test";
import { config } from "dotenv";
import "./extensions";

config();

export default defineConfig({
	testDir: "./src/tests",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	timeout: 500000000,
	workers: process.env.CI ? 1 : undefined,
	globalSetup: require.resolve("./global.setup.ts"),
	globalTeardown: "./global.teardown.ts",
	use: {
		trace: "on-first-retry",
	},
});
