"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayoutSchema = void 0;
const mongoose = require("mongoose");
exports.PayoutSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    bank: { type: String, required: false },
    account_no: { type: Number, required: false },
    name: { type: String, required: false },
    branch: { type: String, required: false },
}, { versionKey: false });
//# sourceMappingURL=payout.schema.js.map