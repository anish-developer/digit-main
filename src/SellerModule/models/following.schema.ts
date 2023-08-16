/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const FollowingSchema = new mongoose.Schema(
  {
    user_id: { type: String, unique: false, required: true },
    plate_id: { type: String, unique: false, required: true },
    like: { type: Boolean },
    created_at: { type: Date, default: Date.now },
  },
  { versionKey: false },
);
