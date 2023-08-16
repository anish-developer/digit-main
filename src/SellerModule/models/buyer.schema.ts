/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const BuyerSchema = new mongoose.Schema(
  {
    card_number: { type: Number, required: false },
    name_of_card: { type: String, required: false },
    cvv: { type: Number, required: false },
    expire_mm: { type: Number, required: false },
    expire_yyyy: { type: Number, required: false },
    user_id: { type: String, required: false },
  },
  { versionKey: false },
);
