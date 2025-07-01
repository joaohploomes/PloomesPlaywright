import type { FullConfig } from "@playwright/test";
import "./extensions/toMatchArrayId";

async function GlobalSetup(config: FullConfig){
    console.log("Starting the tests");
}   

export default GlobalSetup;
