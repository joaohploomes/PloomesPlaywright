import type { FullConfig } from "@playwright/test";

async function GlobalSetup(config: FullConfig){
    console.log("Starting the tests");
}   

export default GlobalSetup;