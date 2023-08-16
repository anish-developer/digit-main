import { Document } from 'mongoose';
export interface News extends Document {
    title: string;
    description: string;
    image: string;
    created_at: Date;
}
