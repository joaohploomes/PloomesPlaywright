import { faker } from "@faker-js/faker";
import type { IUsers } from "@schemas";

function generateMockedUsers(): IUsers {
    return {
        Name: faker.person.fullName(),
        Email: faker.internet.email(),
        ProfileId: 1,
        Suspended: false,
    };
};

export default generateMockedUsers;
