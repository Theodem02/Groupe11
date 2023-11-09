import {faker} from '@faker-js/faker';
import { User, UserBook, UserId } from '../entities';

export const userFixture = (): User =>({
    id: faker.string.uuid() as UserId,
    firstName: faker.string.sample(8),
    lastName: faker.string.sample(8),
    user: [],

})as User;


