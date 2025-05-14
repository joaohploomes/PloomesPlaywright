import { faker, Faker } from "@faker-js/faker";
import type { IDeal } from "@schemas";
import generateMockedContact from "../../Contacts/mockedDataContact/mockedDataContact";

function generateMockedDeal(): IDeal {
  
  return {
      Title: faker.lorem.sentence(),
      ContactId: ,
      Amount: faker.number.int()
  };
};