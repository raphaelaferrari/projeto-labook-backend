"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditPostSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.EditPostSchema = zod_1.default.object({
    id: zod_1.default.string().min(1),
    content: zod_1.default.string().min(1),
    token: zod_1.default.string().min(10)
}).transform(data => data);
//# sourceMappingURL=editPost.dto.js.map