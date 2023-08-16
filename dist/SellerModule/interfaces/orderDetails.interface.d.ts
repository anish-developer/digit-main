import { Document } from 'mongoose';
export interface Order extends Document {
    plate_number: string;
    price: string;
    orderID: string;
    created_at: Date;
}
