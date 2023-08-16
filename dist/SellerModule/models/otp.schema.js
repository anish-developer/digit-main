"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpSchema = void 0;
const mongoose = require("mongoose");
exports.OtpSchema = new mongoose.Schema({
    user_id: { type: String, unique: false, required: false },
    otp: { type: Number, required: false },
    created_at: {
        type: Date,
        index: { expireAfterSeconds: 10 },
        default: Date.now,
    },
}, { versionKey: false });
//# sourceMappingURL=otp.schema.js.map