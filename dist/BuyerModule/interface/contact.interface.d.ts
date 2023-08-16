import { Document } from 'mongoose';
export interface Contact extends Document {
    email: string;
    user_id: string;
    message: string;
    name: string;
    phone: string;
    created_at: Date;
}
