"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePostSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.CreatePostSchema = zod_1.default.object({
    content: zod_1.default.string().min(1),
    token: zod_1.default.string().min(10)
}).transform(data => data);
//# sourceMappingURL=createPost.dto.js.map