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
exports.PostBusiness = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
const Post_1 = require("../models/Post");
const User_1 = require("../models/User");
class PostBusiness {
    constructor(postDatabase, idGenerator, tokenManager) {
        this.postDatabase = postDatabase;
        this.idGenerator = idGenerator;
        this.tokenManager = tokenManager;
        this.createPost = (input) => __awaiter(this, void 0, void 0, function* () {
            const { content, token } = input;
            const payload = this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError("Token invalido");
            }
            const id = this.idGenerator.generate();
            const newPost = new Post_1.Post(id, content, 0, 0, new Date().toISOString(), new Date().toISOString(), payload.id, payload.name);
            const newPostDB = newPost.toDBModel();
            yield this.postDatabase.createPost(newPostDB);
            const output = undefined;
            return output;
        });
        this.getPost = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token } = input;
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Token invalido");
            }
            const postsDBName = yield this.postDatabase.getPost();
            const posts = postsDBName.map((postName) => {
                const post = new Post_1.Post(postName.id, postName.content, postName.likes, postName.dislikes, postName.created_at, postName.updated_at, postName.creator_id, postName.creator_name);
                return post.toBusinessModel();
            });
            const output = posts;
            return output;
        });
        this.editPost = (input) => __awaiter(this, void 0, void 0, function* () {
            const { id, content, token } = input;
            const payload = this.tokenManager.getPayload(token);

            if (!payload) {
                throw new BadRequestError_1.BadRequestError("token inválido");
            }

            const searchPostDB = yield this.postDatabase.searchPostId(id);
            if (!searchPostDB) {
                throw new BadRequestError_1.BadRequestError("não existe post com esse id");
            }
            
            if (payload.id !== searchPostDB.creator_id) {
                throw new BadRequestError_1.BadRequestError("somente quem criou o post pode editar");
            }
            const post = new Post_1.Post(searchPostDB.id, searchPostDB.content, searchPostDB.likes, searchPostDB.dislikes, searchPostDB.created_at, searchPostDB.updated_at, searchPostDB.creator_id, payload.name);
            post.setContent(content);
            post.setUpdatedAt(new Date().toISOString());
            const editPostDB = post.toDBModel();
            yield this.postDatabase.editPost(editPostDB);
            const output = undefined;
            return output;
        });
        this.deletePost = (input) => __awaiter(this, void 0, void 0, function* () {
            const { id, token } = input;
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("token inválido");
            }
            const searchPostDB = yield this.postDatabase.searchPostId(id);
            if (!searchPostDB) {
                throw new BadRequestError_1.BadRequestError("não existe post com esse id");
            }
            if (payload.role === User_1.USER_ROLES.ADMIN) {
            }
            else if (payload.id !== searchPostDB.creator_id) {
                throw new BadRequestError_1.BadRequestError("somente quem criou o post pode deletar");
            }
            yield this.postDatabase.deletePost(id);
            const output = undefined;
            return output;
        });
        this.likeOrDislikPost = (input) => __awaiter(this, void 0, void 0, function* () {
            const { postId, token, typeLike } = input;
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("token inválido");
            }
            const searchPostDB = yield this.postDatabase.searchPostCreatorNameById(postId);
            if (!searchPostDB) {
                throw new BadRequestError_1.BadRequestError("não existe post com esse id");
            }
            const post = new Post_1.Post(searchPostDB.id, searchPostDB.content, searchPostDB.likes, searchPostDB.dislikes, searchPostDB.created_at, searchPostDB.updated_at, searchPostDB.creator_id, searchPostDB.creator_name);
            const alredyLike = typeLike ? 1 : 0;
            const likeDislikeDB = {
                user_id: payload.id,
                post_id: postId,
                like: alredyLike
            };
            const typeLikeExists = yield this.postDatabase.searchLikeDislikePost(likeDislikeDB);
            if (typeLikeExists === Post_1.POST_LIKE.ALREADY_LIKED) {
                if (typeLike) {
                    yield this.postDatabase.removeLikeDislikePost(likeDislikeDB);
                    post.removeLike();
                }
                else {
                    yield this.postDatabase.updateLikeDislikePost(likeDislikeDB);
                    post.removeLike();
                    post.addDislike();
                }
            }
            else if (typeLikeExists === Post_1.POST_LIKE.ALREADY_DISLIKED) {
                if (typeLike === false) {
                    yield this.postDatabase.removeLikeDislikePost(likeDislikeDB);
                    post.removeDislike();
                }
                else {
                    yield this.postDatabase.updateLikeDislikePost(likeDislikeDB);
                    post.removeDislike();
                    post.addLike();
                }
            }
            else {
                yield this.postDatabase.insertLikeDislikePost(likeDislikeDB);
                typeLike ? post.addLike() : post.addDislike();
            }
            const updatedPostDB = post.toDBModel();
            yield this.postDatabase.editPost(updatedPostDB);
            const output = undefined;
            return output;
        });
    }
}
exports.PostBusiness = PostBusiness;
//# sourceMappingURL=PostBusiness.js.map