/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const ContactSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: false },
    email: { type: String, required: false },
    message: { type: String, required: false },
    name: { type: String, required: false },
    phone: { type: String, required: false },
    created_at: { type: Date, default: Date.now },
  },
  { versionKey: false },
);
