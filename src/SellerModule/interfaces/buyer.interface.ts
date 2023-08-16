/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';
export interface Buyer extends Document {
  card_number: number;
  name_of_card: string;
  cvv: number;
  expire_mm: number;
  expire_yyyy: number;
  user_id: string;
}
