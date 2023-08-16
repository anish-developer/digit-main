/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const SessionSchema = new mongoose.Schema(
  {
    ip: { type: String, required: false },
    created_at: { type: Date, default: Date.now },
  },
  { versionKey: false },
);
