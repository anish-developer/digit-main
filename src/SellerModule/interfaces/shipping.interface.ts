/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';
export interface Shipping extends Document {
  address_line_1: string;
  address_line_2: string;
  postcode: number;
  city: string;
  state: string;
  address_type: string;
  user_id: string;
}
