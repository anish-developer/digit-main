"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlateSchema = void 0;
const mongoose = require("mongoose");
exports.PlateSchema = new mongoose.Schema({
    user_id: { type: String, unique: false, required: false },
    plate_number: { type: String, unique: false, required: false },
    name: { type: String, required: false },
    price: { type: String, required: false },
    email: { type: String, required: false },
    admin_id: { type: String, required: false },
    orderID: { type: String, required: false },
    phone: { type: String, required: false },
    file: { type: String, required: false },
    status: { type: String, required: false },
    sell_status: { type: String, required: false },
    seller_level: { type: String, required: false },
    highest_bid: { type: String, required: false },
    lowest_bid: { type: String, required: false },
    transaction_fee: { type: String, required: false },
    Total: { type: String, required: false },
    sell_type: { type: String, required: false },
    add_by: { type: String, default: 'Seller', required: false },
    state: { type: String, required: false },
    expires: { type: String, default: null },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
}, { versionKey: false });
//# sourceMappingURL=plate.schema.js.map