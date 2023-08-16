import { IsNotEmpty, IsString } from 'class-validator';
export class PlateManagementDTO {
  user_id: string;
  plate_number: string;
  admin_id: string;
  name: string;
  price: string;
  @IsNotEmpty({ message: 'Email Required' })
  @IsString()
  email: string;
  orderID: string;
  phone: string;
  file: string;
  status: string;
  sell_status: string;
  seller_level: string;
  highest_bid: string;
  lowest_bid: string;
  expires: string;
  state: string;
  sell_type: string;
  transaction_fee: string;
  Total: string;
  created_at: Date;
  updated_at: Date;
}
