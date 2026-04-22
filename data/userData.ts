import { UniqueGenerator } from '../utils/UniqueGenerator';
export interface User {
  name: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  mobile: string;
};

export const getNewUserData = (): User => {
    return {
        name: UniqueGenerator.getUniqueName(),
        email: UniqueGenerator.getUniqueEmail(),
        password: 'Password@123',
        firstName: 'Vaibhav',
        lastName: 'Grover',
        company: 'MCP',
        address: '123 Main Street',
        city: 'New Delhi',
        state: 'Delhi',
        zipcode: '110001',
        mobile: '9876543210'
    };
};
