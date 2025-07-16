import type { FullConfig } from "@playwright/test";
import "./extensions/toMatchArrayId";

async function GlobalSetup(config: FullConfig) {}

export default GlobalSetup;
