/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const PayoutSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    bank: { type: String, required: false },
    account_no: { type: Number, required: false },
    name: { type: String, required: false },
    branch: { type: String, required: false },
  },
  { versionKey: false },
);
