"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const idGenerator_1 = require("../services/idGenerator");
const tokenManager_1 = require("../services/tokenManager");
const PostBusiness_1 = require("../business/PostBusiness");
const PostController_1 = require("../controller/PostController");
const PostDatabase_1 = require("../database/PostDatabase");
exports.postRouter = express_1.default.Router();
const postController = new PostController_1.PostController(new PostBusiness_1.PostBusiness(new PostDatabase_1.PostDatabase(), new idGenerator_1.IdGenerator(), new tokenManager_1.TokenManager()));
exports.postRouter.get("/", postController.getPost);
exports.postRouter.post("/", postController.createPost);
exports.postRouter.put("/:id", postController.editPost);
exports.postRouter.delete("/:id", postController.deletePost);
exports.postRouter.post("/:id/like", postController.likeOrDislikPost);
//# sourceMappingURL=postRoutes.js.map