import { Document } from 'mongoose';
export interface Plate extends Document {
    user_id: string;
    plate_number: string;
    orderID: string;
    name: string;
    price: string;
    email: string;
    phone: string;
    admin_id: string;
    file: string;
    status: string;
    sell_status: string;
    seller_level: string;
    highest_bid: string;
    lowest_bid: string;
    expires: string;
    state: string;
    sell_type: string;
    add_by: string;
    transaction_fee: string;
    Total: string;
    created_at: Date;
    updated_at: Date;
}
