export class PurchaseManagementDTO {
  plate_id: string;
  plate_number: string;
  buyer_id: string;
  owner_id: string;
  bid_price: string;
  sell_price: string;
  orderID: string;
  trans_id: string;
  payment_status: string;
  buy_type: string;

  price: number;
  Total: number;
  transaction_fee: string;
  expires: string;
  name: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  created_at: Date;

  payment_bill_id: string;
  paid_at: string;
  x_signature: string;
  redirect_url: string;
  first_name: string;
  last_name: string;
  date: string;
}
