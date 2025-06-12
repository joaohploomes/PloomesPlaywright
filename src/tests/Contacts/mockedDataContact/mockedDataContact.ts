import { faker } from '@faker-js/faker';
import type { IContact } from '@schemas';

function generateMockedContact(type: "company" | "person"): IContact { 
  if(type === "company") {
    return {
      Name: faker.company.name(),
      Email: faker.internet.email(),
      TypeId: 1,
     };
  } 
  return {
    Name: faker.person.fullName(),
    Email: faker.internet.email(),
    TypeId: 2,
  };
};

export default generateMockedContact;
