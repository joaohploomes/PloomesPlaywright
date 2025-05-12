import type { FullConfig } from "@playwright/test";

async function GlobalTeardown(config: FullConfig){
    console.log("End of the tests");
}   

export default GlobalTeardown;