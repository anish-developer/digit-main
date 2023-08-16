"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowingSchema = void 0;
const mongoose = require("mongoose");
exports.FollowingSchema = new mongoose.Schema({
    user_id: { type: String, unique: false, required: true },
    plate_id: { type: String, unique: false, required: true },
    like: { type: Boolean },
    created_at: { type: Date, default: Date.now },
}, { versionKey: false });
//# sourceMappingURL=following.schema.js.map