"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPage = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
let browserInstance;
(async () => {
    const browser = await puppeteer_1.default.launch({ headless: false });
    browserInstance = browser;
})();
function createPage() {
    return browserInstance.newPage();
}
exports.createPage = createPage;
