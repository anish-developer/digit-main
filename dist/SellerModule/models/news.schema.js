"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsScheema = void 0;
const mongoose = require("mongoose");
exports.NewsScheema = new mongoose.Schema({
    title: { type: String, required: false },
    description: { type: String, required: false },
    image: { type: String, required: false },
    created_at: { type: Date, default: Date.now },
}, { versionKey: false });
//# sourceMappingURL=news.schema.js.map