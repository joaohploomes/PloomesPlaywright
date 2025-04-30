import { faker } from '@faker-js/faker';
import type { IContact } from '@schemas';

function generateMockedContact(): IContact {
  return {
    name: faker.person.firstName(),
    email: faker.internet.email(),
  };
};

export default generateMockedContact;
