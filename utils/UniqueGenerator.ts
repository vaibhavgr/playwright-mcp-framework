import { faker } from '@faker-js/faker';

export class UniqueGenerator{

    static getUniqueName() {
    return faker.person.firstName();
  }

    static getUniqueEmail(){
        return faker.internet.email();
    }



}