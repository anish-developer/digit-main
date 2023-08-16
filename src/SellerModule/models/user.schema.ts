import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema(
  {
    // Type: Personal
    account_type: { type: String, required: false },
    first_name: { type: String, required: false },
    last_name: { type: String, required: false },
    passport_number: { type: String, required: false },
    category: { type: String, required: false },
    name: { type: String, required: false },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    authentication: { type: String, default: '0' },
    company_name: { type: String, required: false },
    company_register_number: { type: String, required: false },
    PIC_fullname: { type: String, required: false },
    phone: { type: String, required: false },
    address1: { type: String, required: false },
    address2: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    zipCode: { type: String, required: false },
    file: { type: String, required: false },
    al_file: { type: String, required: false },
    al_status: { type: String, default: '0' },
    user_type: { type: String, required: false },
    status: { type: String, default: '0' },
    plate_count: { type: String, default: '0' },
    total_sales: { type: String, default: '0' },
    last_login: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
