"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionSchema = void 0;
const mongoose = require("mongoose");
exports.SessionSchema = new mongoose.Schema({
    ip: { type: String, required: false },
    created_at: { type: Date, default: Date.now },
}, { versionKey: false });
//# sourceMappingURL=session.schema.js.map