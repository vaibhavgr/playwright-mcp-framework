import { UniqueGenerator } from '../utils/UniqueGenerator';

export interface PaymentDetails {
    nameOnCard: string;
    cardNumber: string;
    cvc: string;
    expiryMonth: string;
    expiryYear: string;
}


export const testCardData=(): PaymentDetails => {
    return {
    nameOnCard: UniqueGenerator.getUniqueName(),
    cardNumber: '411111111111111', // Standard Visa Test Card
    cvc: '123',
    expiryMonth: '12',
    expiryYear: '2028'
    }
}
