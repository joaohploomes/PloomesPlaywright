import type { FullConfig } from "@playwright/test";

async function GlobalTeardown(config: FullConfig) {}

export default GlobalTeardown;
