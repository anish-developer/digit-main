/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface Purchase extends Document {
  plate_id: string;
  plate_number: string;
  buyer_id: string;
  ownerId: string;
  bid_price: string;
  sell_price: string;
  orderID: string;
  trans_id: string;
  buy_type: string;
  payment_status: string;
  payment_bill_id: string;
  paid_at: string;
  x_signature: string;
  created_at: Date;
}
