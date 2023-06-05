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
exports.PostDatabase = void 0;
const Post_1 = require("../models/Post");
const BaseDatabase_1 = require("./BaseDatabase");
const UserDatabase_1 = require("./UserDatabase");
class PostDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.getPost = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(PostDatabase.TABLE_POSTS)
                .select(`${PostDatabase.TABLE_POSTS}.id`, `${PostDatabase.TABLE_POSTS}.content`, `${PostDatabase.TABLE_POSTS}.creator_id`, `${PostDatabase.TABLE_POSTS}.likes`, `${PostDatabase.TABLE_POSTS}.dislikes`, `${PostDatabase.TABLE_POSTS}.created_at`, `${PostDatabase.TABLE_POSTS}.updated_at`, `${UserDatabase_1.UserDatabase.TABLE_NAME}.name as creator_name`)
                .join(`${UserDatabase_1.UserDatabase.TABLE_NAME}`, `${PostDatabase.TABLE_POSTS}.creator_id`, "=", `${UserDatabase_1.UserDatabase.TABLE_NAME}.id`);
            return result;
        });
        this.searchPostId = (id) => __awaiter(this, void 0, void 0, function* () {
            const [result] = yield BaseDatabase_1.BaseDatabase.connection(PostDatabase.TABLE_POSTS)
                .select()
                .where({ id });
            return result;
        });
        this.editPost = (postDb) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(PostDatabase.TABLE_POSTS)
                .update(postDb)
                .where({ id: postDb.id });
        });
        this.deletePost = (id) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(PostDatabase.TABLE_POSTS)
                .delete()
                .where({ id });
        });
        this.searchPostCreatorNameById = (id) => __awaiter(this, void 0, void 0, function* () {
            const [result] = yield BaseDatabase_1.BaseDatabase.connection(PostDatabase.TABLE_POSTS)
                .select(`${PostDatabase.TABLE_POSTS}.id`, `${PostDatabase.TABLE_POSTS}.creator_id`, `${PostDatabase.TABLE_POSTS}.content`, `${PostDatabase.TABLE_POSTS}.likes`, `${PostDatabase.TABLE_POSTS}.dislikes`, `${PostDatabase.TABLE_POSTS}.created_at`, `${PostDatabase.TABLE_POSTS}.updated_at`, `${UserDatabase_1.UserDatabase.TABLE_NAME}.name as creator_name`)
                .join(`${UserDatabase_1.UserDatabase.TABLE_NAME}`, `${PostDatabase.TABLE_POSTS}.creator_id`, "=", `${UserDatabase_1.UserDatabase.TABLE_NAME}.id`)
                .where({ [`${PostDatabase.TABLE_POSTS}.id`]: id });
            return result;
        });
        this.searchLikeDislikePost = (likeDislikeDB) => __awaiter(this, void 0, void 0, function* () {
            const [result] = yield BaseDatabase_1.BaseDatabase.connection(PostDatabase.TABLE_TYPE_LIKES)
                .select()
                .where({
                user_id: likeDislikeDB.user_id,
                post_id: likeDislikeDB.post_id
            });
            if (result === undefined) {
                return undefined;
            }
            else if (result.like === 1) {
                return Post_1.POST_LIKE.ALREADY_LIKED;
            }
            else {
                return Post_1.POST_LIKE.ALREADY_DISLIKED;
            }
        });
        this.removeLikeDislikePost = (likeDislikeDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(PostDatabase.TABLE_TYPE_LIKES)
                .delete()
                .where({
                user_id: likeDislikeDB.user_id,
                post_id: likeDislikeDB.post_id
            });
        });
        this.updateLikeDislikePost = (likeDislikeDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(PostDatabase.TABLE_TYPE_LIKES)
                .update(likeDislikeDB)
                .where({
                user_id: likeDislikeDB.user_id,
                post_id: likeDislikeDB.post_id
            });
        });
        this.insertLikeDislikePost = (likeDislikeDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(PostDatabase.TABLE_TYPE_LIKES)
                .insert(likeDislikeDB);
        });
    }
    createPost(createPost) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(PostDatabase.TABLE_POSTS).insert(createPost);
        });
    }
}
PostDatabase.TABLE_POSTS = "posts";
PostDatabase.TABLE_TYPE_LIKES = "likes_dislikes";
exports.PostDatabase = PostDatabase;
//# sourceMappingURL=PostDatabase.js.map