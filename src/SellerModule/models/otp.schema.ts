/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const OtpSchema = new mongoose.Schema(
  {
    user_id: { type: String, unique: false, required: false },
    otp: { type: Number, required: false },
    created_at: {
      type: Date,
      index: { expireAfterSeconds: 10 },
      default: Date.now,
    },
  },
  { versionKey: false },
);
