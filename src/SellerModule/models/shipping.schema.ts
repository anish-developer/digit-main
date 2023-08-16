/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const ShippingSchema = new mongoose.Schema(
  {
    address_line_1: { type: String, required: true },
    address_line_2: { type: String, required: false },
    postcode: { type: Number, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    address_type: { type: String, required: false },
    user_id: { type: String, required: true },
  },
  { versionKey: false },
);
