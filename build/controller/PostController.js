"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const createPost_dto_1 = require("../dtos/posts/createPost.dto");
const zod_1 = require("zod");
const BaseError_1 = require("../errors/BaseError");
const getPost_dto_1 = require("../dtos/posts/getPost.dto");
const editPost_dto_1 = require("../dtos/posts/editPost.dto");
const deletePost_dto_1 = require("../dtos/posts/deletePost.dto");
const likeOrDislikePost_dto_1 = require("../dtos/posts/likeOrDislikePost.dto");
class PostController {
    constructor(postBusiness) {
        this.postBusiness = postBusiness;
        this.createPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = createPost_dto_1.CreatePostSchema.parse({
                    content: req.body.content,
                    token: req.headers.authorization
                });
                const output = yield this.postBusiness.createPost(input);
                res.status(201).send(output);
            }
            catch (error) {
                console.log(error);
                if (error instanceof zod_1.ZodError) {
                    res.status(400).send(error.issues);
                }
                else if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
        this.getPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = getPost_dto_1.GetPostSchema.parse({
                    token: req.headers.authorization
                });
                const output = yield this.postBusiness.getPost(input);
                res.status(200).send(output);
            }
            catch (error) {
                console.log(error);
                if (error instanceof zod_1.ZodError) {
                    res.status(400).send(error.issues);
                }
                else if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
        this.editPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = editPost_dto_1.EditPostSchema.parse({
                    id: req.params.id,
                    content: req.body.content,
                    token: req.headers.authorization
                });
                const output = yield this.postBusiness.editPost(input);
                res.status(200).send(output);
            }
            catch (error) {
                console.log(error);
                if (error instanceof zod_1.ZodError) {
                    res.status(400).send(error.issues);
                }
                else if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
        this.deletePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = deletePost_dto_1.DeletePostSchema.parse({
                    id: req.params.id,
                    token: req.headers.authorization
                });
                const output = yield this.postBusiness.deletePost(input);
                res.status(200).send(output);
            }
            catch (error) {
                console.log(error);
                if (error instanceof zod_1.ZodError) {
                    res.status(400).send(error.issues);
                }
                else if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
        this.likeOrDislikPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = likeOrDislikePost_dto_1.likeOrDislikPostSchema.parse({
                    postId: req.params.id,
                    token: req.headers.authorization,
                    typeLike: req.body.like
                });
                const output = yield this.postBusiness.likeOrDislikPost(input);
                res.status(200).send(output);
            }
            catch (error) {
                console.log(error);
                if (error instanceof zod_1.ZodError) {
                    res.status(400).send(error.issues);
                }
                else if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
    }
}
exports.PostController = PostController;
//# sourceMappingURL=PostController.js.map