import { Document } from 'mongoose';
export interface Order extends Document {
    plate_id: string;
    plate_number: string;
    orderID: string;
    price: string;
    Total: string;
    transaction_fee: string;
    expires: string;
    name: string;
    email: string;
    phone: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: string;
    created_at: Date;
}
