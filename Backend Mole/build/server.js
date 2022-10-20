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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var cors = require('cors');
const client_1 = require("@prisma/client");
const crypto_1 = __importDefault(require("crypto"));
const body_parser_1 = __importDefault(require("body-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("./models");
const prisma = new client_1.PrismaClient();
var jsonParser = body_parser_1.default.json();
var urlencodedParser = body_parser_1.default.urlencoded({ extended: false });
dotenv_1.default.config();
const criptografia = {
    algoritmo: "aes256",
    codificacao: "utf8",
    segredo: "2e1eeabf4f0f1abdaca739a4be445d16",
    tipo: "hex"
};
var app = (0, express_1.default)();
app.use(cors());
app.get("/users", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield prisma.user.findMany();
        res.send(data);
    });
});
app.post("/create-account", jsonParser, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let usuario = new models_1.User(req.body.email, req.body.password, req.body.name, req.body.avatar);
        const user = yield prisma.user.create({
            data: {
                email: usuario.email,
                password: usuario.password,
                name: usuario.name,
                avatar: usuario.avatar,
            }
        });
        let criado = yield prisma.user.findFirst({
            where: {
                email: usuario.email,
                password: criptografar(usuario.password)
            }
        });
        var resultado = criado ? geraToken(usuario.email) : "";
        res.send(resultado);
    });
});
app.get("/posts", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = Number(req.query.id);
        let data = yield prisma.post.findMany({
            select: {
                id: true,
                content: true,
                data: true,
                author: {
                    select: {
                        name: true,
                        avatar: true
                    },
                },
                likes: {
                    select: {
                        id: true,
                    },
                    where: {
                        authorId: id
                    },
                },
                _count: {
                    select: { likes: true },
                }
            },
            orderBy: {
                data: "desc",
            },
        });
        res.send(data);
    });
});
app.post("/teste-classes/usuario", jsonParser, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let usuario = new models_1.User(req.body.email, req.body.password, req.body.name, req.body.avatar);
        const user = yield prisma.user.create({
            data: {
                email: usuario.email,
                password: criptografar(usuario.password),
                name: usuario.name,
                avatar: usuario.avatar,
            }
        });
        let criado = yield prisma.user.findFirst({
            where: {
                email: usuario.email
            }
        });
        res.send(criado);
    });
});
app.delete("/teste-classes/del-usuario", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const email = req.query.email;
        if (email) {
            const user = yield prisma.user.delete({
                where: {
                    email: email.toString()
                }
            });
        }
        res.send("");
    });
});
app.put("/teste-classes/update-usuario", jsonParser, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let usuario = new models_1.User(req.body.email, req.body.password, req.body.name, req.body.avatar);
        const updateUser = yield prisma.user.update({
            where: {
                email: usuario.email,
            },
            data: {
                name: usuario.name,
                password: criptografar(usuario.password),
                avatar: usuario.avatar
            },
        });
        res.send(updateUser);
    });
});
app.post("/teste-classes/post", jsonParser, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let post = new models_1.Post(req.body.content, req.body.authorId);
        const criarPost = yield prisma.post.create({
            data: {
                content: post.content,
                authorId: post.authorId
            }
        });
        let criado = yield prisma.post.findFirst({
            where: {
                content: post.content
            }
        });
        res.send(criado);
    });
});
app.post("/teste-classes/all", jsonParser, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let usuario = new models_1.User(req.body.email, req.body.password, req.body.name, req.body.avatar);
        const user = yield prisma.user.create({
            data: {
                email: usuario.email,
                password: criptografar(usuario.password),
                name: usuario.name,
                avatar: usuario.avatar,
            }
        });
        let post = new models_1.Post(req.body.content, req.body.authorId);
        const criarPost = yield prisma.post.create({
            data: {
                content: post.content,
                authorId: user.id
            }
        });
        let like = new models_1.Like(user.id, criarPost.id);
        const criarLike = yield prisma.like.create({
            data: {
                authorId: like.authorId,
                postId: like.postId
            }
        });
        let comment = new models_1.Comment(user.id, criarPost.id, req.body.comment);
        const criarComment = yield prisma.comment.create({
            data: {
                postId: comment.postId,
                authorId: comment.authorId,
                content: comment.comment
            }
        });
        let qtdePosts = yield prisma.post.aggregate({
            _count: {
                id: true,
            },
            where: {
                data: {
                    gte: new Date("2022-10-3"),
                    lt: new Date("2022-10-4")
                },
            },
        });
        let qtdeLikes = yield prisma.like.aggregate({
            _count: {
                id: true
            },
            where: {
                data: {
                    gte: new Date("2022-10-3"),
                    lt: new Date("2022-10-4")
                },
            },
        });
        let qtdeComments = yield prisma.comment.aggregate({
            _count: {
                id: true,
            },
            where: {
                data: {
                    gte: new Date("2022-10-3"),
                    lt: new Date("2022-10-4")
                },
            },
        });
        let dia = new models_1.analiseDia(qtdePosts._count.id, qtdeLikes._count.id, qtdeComments._count.id);
        yield prisma.like.delete({
            where: {
                id: criarLike.id
            }
        });
        yield prisma.comment.delete({
            where: {
                id: criarComment.id
            }
        });
        yield prisma.post.delete({
            where: {
                id: criarPost.id
            }
        });
        yield prisma.user.delete({
            where: {
                email: user.email
            }
        });
        res.send(["Usuário:", user, "Post:", criarPost, "Like:", like, "Comentário:", criarComment, "Analise Dia:", dia]);
    });
});
app.post("/login", jsonParser, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield prisma.user.findFirst({
            where: {
                email: req.body.email,
                password: req.body.password
            },
        });
        var resultado = data ? geraToken(req.body.email) : "";
        res.send(resultado);
    });
});
app.get("/passwordCriptographer", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var criptografada = criptografar(req.query.password);
        res.send(criptografada);
    });
});
app.get("/validate-token", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let tokenDescripted = jsonwebtoken_1.default.verify(req.query.token, criptografia.segredo);
        let data;
        if (typeof tokenDescripted == "object") {
            data = yield prisma.user.findFirst({
                select: {
                    id: true,
                    email: true,
                    password: true,
                    name: true,
                    avatar: true,
                },
                where: {
                    email: tokenDescripted.email
                },
            });
        }
        res.send(data);
    });
});
app.post("/gravar-post", jsonParser, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = yield prisma.user.findFirst({
            select: {
                id: true
            }, where: {
                email: req.body.emailUsuario
            }
        });
        if (id) {
            let post = yield prisma.post.create({
                data: {
                    content: req.body.post,
                    authorId: id.id
                }
            });
            res.send(post);
        }
        else {
            res.send("");
        }
    });
});
app.post("/criar-like", jsonParser, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let like = yield prisma.like.create({
            data: {
                authorId: req.body.authorId,
                postId: req.body.postId
            }
        });
        res.send(like);
    });
});
app.delete("/remover-like", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let idLike = Number(req.query.likeId);
        let a = yield prisma.like.delete({
            where: {
                id: idLike
            }
        });
    });
});
function criptografar(senha) {
    const cipher = crypto_1.default.createCipher(criptografia.algoritmo, criptografia.segredo);
    cipher.update(senha);
    var criptografada = cipher.final(criptografia.tipo);
    return criptografada;
}
function descriptografar(senha) {
    const decipher = crypto_1.default.createDecipher(criptografia.algoritmo, criptografia.segredo);
    decipher.update(senha, criptografia.tipo);
    return decipher.final();
}
;
function geraToken(email) {
    let jwtSecretKey = criptografia.segredo;
    let data = {
        time: Date(),
        email: email,
    };
    const token = jsonwebtoken_1.default.sign(data, jwtSecretKey);
    return token;
}
function existeLike(authorId, postId) {
    return __awaiter(this, void 0, void 0, function* () {
        let like = yield prisma.like.findFirst({
            select: {
                id: true
            },
            where: {
                postId: postId,
                authorId: authorId
            }
        });
        return like;
    });
}
app.get("/teste-like", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield existeLike(Number(req.query.authorId), Number(req.query.postId));
        res.send(data);
    });
});
app.listen(3000);
