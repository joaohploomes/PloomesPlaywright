import { faker } from "@faker-js/faker";
import type { ITeams } from "@schemas";

function generateMockedTeams(): ITeams {
    return {
        Name: faker.company.buzzAdjective(),
    };
};

export default generateMockedTeams;
