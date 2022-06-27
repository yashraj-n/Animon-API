"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cross_fetch_1 = __importDefault(require("cross-fetch"));
async function getHTML(url) {
    const res = await (0, cross_fetch_1.default)(url);
    const html = await res.text();
    return html;
}
exports.default = getHTML;
