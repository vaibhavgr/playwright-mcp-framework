import { UniqueGenerator } from '../utils/UniqueGenerator';


export const testCardData = {
    nameOnCard: UniqueGenerator.getUniqueName(),
    cardNumber: '411111111111111', // Standard Visa Test Card
    cvc: '123',
    expiryMonth: '12',
    expiryYear: '2028'
}
