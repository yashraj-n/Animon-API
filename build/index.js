"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./utils/server"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
require("./utils/redisDB");
let files = fs_1.default.readdirSync(path_1.default.join(__dirname, "routes"));
for (let file of files) {
    Promise.resolve().then(() => __importStar(require(`./routes/${file}`)));
}
(async () => {
    try {
        //@ts-ignore
        server_1.default.listen(process.env.PORT, "0.0.0.0");
        console.log(`[+] Server listening on port ${process.env.PORT}`);
        console.log("Server started on port " + process.env.PORT);
    }
    catch (error) {
        console.log(error);
    }
})();
