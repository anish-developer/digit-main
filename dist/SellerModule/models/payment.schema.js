"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentSchema = void 0;
const mongoose = require("mongoose");
exports.PaymentSchema = new mongoose.Schema({
    user_id: { type: String, required: true, unique: false },
    bank_transfer: { type: String, required: false },
    paypal: { type: String, required: false },
    credit_card: { type: String, required: false },
    bank_name: { type: String, required: false },
    debit_card: { type: String, required: false },
    name: { type: String, required: false },
    account_name: { type: String, required: false },
    account_number: { type: String, required: false },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    address_line_1: { type: String, required: false },
    address_line_2: { type: String, required: false },
    state: { type: String, required: false },
    zip_code: { type: String, required: false },
    created_at: { type: Date, default: Date.now },
    card_number: { type: Number, required: false },
    name_of_card: { type: String, required: false },
    cvv: { type: Number, required: false },
    expire_mm: { type: Number, required: false },
    expire_yyyy: { type: Number, required: false },
    bank: { type: String, required: false },
    account_no: { type: Number, required: false },
    branch: { type: String, required: false },
}, { versionKey: false });
//# sourceMappingURL=payment.schema.js.map