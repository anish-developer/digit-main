import * as mongoose from 'mongoose';

export const NewsScheema = new mongoose.Schema(
  {
    title: { type: String, required: false },
    description: { type: String, required: false },
    image: { type: String, required: false },
    created_at: { type: Date, default: Date.now },
  },
  { versionKey: false },
);
