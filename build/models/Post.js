"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.POST_LIKE = void 0;
var POST_LIKE;
(function (POST_LIKE) {
    POST_LIKE["ALREADY_LIKED"] = "YES";
    POST_LIKE["ALREADY_DISLIKED"] = "YES";
})(POST_LIKE = exports.POST_LIKE || (exports.POST_LIKE = {}));
class Post {
    constructor(id, content, likes, dislikes, createdAt, updatedAt, creatorId, creatorName) {
        this.id = id;
        this.content = content;
        this.likes = likes;
        this.dislikes = dislikes;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.creatorId = creatorId;
        this.creatorName = creatorName;
        this.addLike = () => {
            this.likes++;
        };
        this.removeLike = () => {
            this.likes--;
        };
        this.addDislike = () => {
            this.dislikes++;
        };
        this.removeDislike = () => {
            this.dislikes--;
        };
    }
    getId() {
        return this.id;
    }
    setId(value) {
        this.id = value;
    }
    getCreatorId() {
        return this.creatorId;
    }
    setCreatorId(value) {
        this.creatorId = value;
    }
    getContent() {
        return this.content;
    }
    setContent(value) {
        this.content = value;
    }
    getLikes() {
        return this.likes;
    }
    setLikes(value) {
        this.likes = value;
    }
    getDislikes() {
        return this.dislikes;
    }
    setDislikes(value) {
        this.dislikes = value;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    setCreatedAt(value) {
        this.createdAt = value;
    }
    getUpdatedAt() {
        return this.updatedAt;
    }
    setUpdatedAt(value) {
        this.updatedAt = value;
    }
    getCreatorName() {
        return this.creatorName;
    }
    setCreatorName(value) {
        this.creatorName = value;
    }
    toDBModel() {
        return {
            id: this.id,
            creator_id: this.creatorId,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        };
    }
    toBusinessModel() {
        return {
            id: this.id,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.createdAt,
            updated_at: this.updatedAt,
            creator: {
                id: this.creatorId,
                name: this.creatorName
            }
        };
    }
}
exports.Post = Post;
//# sourceMappingURL=Post.js.map