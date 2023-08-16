"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactSchema = void 0;
const mongoose = require("mongoose");
exports.ContactSchema = new mongoose.Schema({
    user_id: { type: String, required: false },
    email: { type: String, required: false },
    message: { type: String, required: false },
    name: { type: String, required: false },
    phone: { type: String, required: false },
    created_at: { type: Date, default: Date.now },
}, { versionKey: false });
//# sourceMappingURL=contact.schema.js.map