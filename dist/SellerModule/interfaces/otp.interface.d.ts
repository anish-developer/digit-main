import { Document } from 'mongoose';
export interface Otp extends Document {
    user_id: string;
    otp: number;
    created_at: Date;
}
