/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface User extends Document {
  account_type: string;
  first_name: string;
  last_name: string;
  passport_number: string;
  category: string;
  name: string;
  email: string;
  password: string;
  authentication: string;
  company_name: string;
  company_register_number: string;
  PIC_fullname: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  file: string;
  al_file: string;
  al_status: string;
  user_type: string;
  plate_count: string;
  total_sales: string;
  last_login: Date;
  updated_at: Date;
  created_at: Date;
}
