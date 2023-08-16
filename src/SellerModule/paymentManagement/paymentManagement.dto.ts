export class PaymentManagementDTO {
  user_id: string;
  bank_transfer: string;
  // paypal: string;
  // credit_card: string;
  // debit_card: string;
  bank_name: string;
  account_name: string;
  account_number: string;
  name: string;
  email: string;
  phone: string;
  address_line_1: string;
  address_line_2: string;
  state: string;
  zip_code: string;
  created_at: Date;
  card_number: number;
  name_of_card: string;
  cvv: number;
  expire_mm: number;
  expire_yyyy: number;
  bank: string;
  account_no: number;
  branch: string;
}
