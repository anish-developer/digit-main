"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseSchema = void 0;
const mongoose = require("mongoose");
exports.PurchaseSchema = new mongoose.Schema({
    plate_id: { type: String, unique: false },
    plate_number: { type: String, required: false },
    buyer_id: { type: String, required: false },
    owner_id: { type: String, required: false },
    bid_price: { type: String, required: false },
    payment_status: { type: String, default: 'false' },
    sell_price: { type: String, required: false },
    orderID: { type: String, required: false },
    trans_id: { type: String, required: false },
    buy_type: { type: String, required: false },
    sell_plate: { type: String, default: '0' },
    payment_bill_id: { type: String, required: false },
    paid_at: { type: String, required: false },
    x_signature: { type: String, required: false },
    created_at: { type: Date, default: Date.now },
}, { versionKey: false });
//# sourceMappingURL=purchase.schema.js.map