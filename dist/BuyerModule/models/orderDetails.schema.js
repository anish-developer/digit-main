"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = void 0;
const mongoose = require("mongoose");
exports.OrderSchema = new mongoose.Schema({
    plate_id: { type: String, required: false },
    plate_number: { type: String, unique: false, required: false },
    orderID: { type: String, required: false },
    price: { type: String, required: false },
    Total: { type: String, required: false },
    transaction_fee: { type: String, required: false },
    expires: { type: String, required: false },
    name: { type: String, required: false },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    address1: { type: String, required: false },
    address2: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    zipCode: { type: String, required: false },
    created_at: { type: Date, default: Date.now },
}, { versionKey: false });
//# sourceMappingURL=orderDetails.schema.js.map