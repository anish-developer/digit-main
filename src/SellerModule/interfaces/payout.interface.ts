/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';
export interface Payout extends Document {
  user_id: string;
  bank: string;
  account_no: number;
  name: string;
  branch: string;
}
