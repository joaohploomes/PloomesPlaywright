import { faker } from '@faker-js/faker';
import type { IContact } from '@schemas';

function generateMockedContact(): IContact {
  return {
    Name: faker.person.firstName(),
    Email: faker.internet.email(),
  };
};

export default generateMockedContact;
