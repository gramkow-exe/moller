"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analiseDia = exports.Comment = exports.Like = exports.Post = exports.User = void 0;
class User {
    constructor(email, password, name, avatar) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.avatar = avatar;
    }
}
exports.User = User;
class Post {
    constructor(content, authorId) {
        this.content = content;
        this.authorId = authorId;
    }
}
exports.Post = Post;
class Like {
    constructor(authorId, postId) {
        this.authorId = authorId;
        this.postId = postId;
    }
}
exports.Like = Like;
class Comment {
    constructor(authorId, postId, comment) {
        this.authorId = authorId;
        this.postId = postId;
        this.comment = comment;
    }
}
exports.Comment = Comment;
class analiseDia {
    constructor(qtdePosts, qtdeLikes, qtdeComments) {
        this.qtdePosts = qtdePosts;
        this.qtdeLikes = qtdeLikes;
        this.qtdeComments = qtdeComments;
    }
}
exports.analiseDia = analiseDia;
