import { Document } from 'mongoose';
export interface Following extends Document {
    user_id: string;
    plate_id: string;
    like: boolean;
    created_at: Date;
}
