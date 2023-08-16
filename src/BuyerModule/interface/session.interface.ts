/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface Session extends Document {
  ip: string;
  created_at: Date;
}
