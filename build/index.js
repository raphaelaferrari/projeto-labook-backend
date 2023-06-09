"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = require("./router/userRoutes");
const postRoutes_1 = require("./router/postRoutes");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(Number(process.env.PORT) || 3003, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
app.use("/users", userRoutes_1.userRouter);
app.use("/posts", postRoutes_1.postRouter);
//# sourceMappingURL=index.js.map