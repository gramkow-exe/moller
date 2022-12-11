import express, { ErrorRequestHandler } from "express";
var cors = require('cors');
var multer = require('multer');
import { PrismaClient } from "@prisma/client";
import crypto, {Encoding, createHash} from "crypto"
import bodyParser, { json } from "body-parser"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

import { analiseDia, Comment, Like, Post, User } from "./models";
import os from "os"
import { NextPlan } from "@mui/icons-material";


const prisma = new PrismaClient()

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
dotenv.config();

const networkInfo = os.networkInterfaces();


interface DADOS_CRIPTOGRAFAR{
    algoritmo : string,
    codificacao : string,
    segredo : string,
    tipo  : Encoding
}

const criptografia : DADOS_CRIPTOGRAFAR  = {
    algoritmo : "aes256",
    codificacao : "utf8",
    segredo : "2e1eeabf4f0f1abdaca739a4be445d16",
    tipo  : "hex"
};

var app = express()

app.use(express.static("uploads"))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {};

const storage = multer.diskStorage({
    destination: function (req:any, file:any, cb:any) {
        cb(null, '../Backend Mole/uploads/');
    }
    ,
    filename: function (req:any, file:any, cb:any) {
        cb(null, req.query.name);
    }
});

const fileFilter = (req:any, file:any, cb:any) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}


app.use(errorHandler);
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})
app.use(upload.any());

app.get("/", async function hello(req, res) {
    
    let ip = networkInfo
    res.send(`Igor e Zanella (MOLES) <br/> Backend Operante!, Rotas: <a href='https://github.com/gramkow-exe/moller'> Github </a> <br/> IP: ${networkInfo?.["Wi-Fi"]?.[1]?.address}:3000`)
})

//-----------------------------------------

/*
* USERS
*/

//-----------------------------------------

app.get("/users", async function(req, res){
    let data = await prisma.user.findMany()
    res.send(data)
})

app.post("/create-account", jsonParser, async function(req, res){
    let usuario = new User(
        req.body.email,
        req.body.password, 
        req.body.name, 
        req.body.avatar,     
    ) 
    if (await verifyEmailExistence(usuario.email) != null){
        res.send("")
        return
    }
    
    const user = await prisma.user.create({
        data:{
            email: usuario.email,
            password:usuario.password,
            name: usuario.name,
            avatar: usuario.avatar,
        }
    })


    let criado = await prisma.user.findFirst({
        where: {
            email: usuario.email,
            password:await criptografar(usuario.password)
    }})
    var resultado = criado ? geraToken(usuario.email) : ""
    res.send(resultado)
})

app.put("/alterar-usuario", jsonParser, async function(req, res){

    let usuario = new User(
        req.body.email,
        req.body.password, 
        req.body.nome, 
        req.body.avatar, 
    ) 

    const updateUser = await prisma.user.update({
        where: {
          email: usuario.email,
        },
        data: {
          name: usuario.name,
          email: req.body.emailForm,
          avatar: usuario.avatar
        },
    })
    
    res.send(updateUser)
})

app.post("/login", jsonParser, async function(req : any,res, next){
    try{
        let data = await prisma.user.findUniqueOrThrow({
            where: {
                email : req.body.email,   
            }, 
        })
        var resultado = data.password == req.body.password ? geraToken(req.body.email) : ""
        res.send(resultado)
    }catch(error){
        next(error)
    }
    
})

app.delete("/delete-user", async function(req : any,res){
    const userToDelete = await prisma.user.findFirst({
        where:{
            password:await criptografar(req.body.password)
        }
    })

    if (userToDelete != null && userToDelete.id == req.body.id){
        prisma.user.delete({
            where:{
                id: userToDelete.id
            }
        })
    }
})

app.put("/change-password",jsonParser, async function (req:any, res) {
    let token = await validarToken(req.headers['token'])
    let passVerify = await verifyPassword(req.body.email, req.body.oldPassword)


    
    if (token.email != null && token.email == req.body.email && passVerify){
        await prisma.user.update({
            where: {
              email: token.email,
            },data:{
                password:req.body.newPassword
            }
        })
    }

    res.send("")
})

app.get("/user-page", async function(req:any, res){
    let email = req.query.email
    let token = await validarToken(req.headers['token'])

    let data = null

    if (email){
         let user = await prisma.user.findUnique({
            select:{
                avatar:true,
                name:true,
            },
            where:{
                email:email
            }
        })
        let posts = await prisma.post.findMany({
            
            select:{
                id: true,
                content:true,
                data: true,
                imageName:true,
                author: {
                    
                    select: {
                      name: true,
                      email:true,
                      avatar: true
                    },
                }, 
                likes:{
                    select:{
                        id:true,
                    },
                    where:{
                        authorId: token.id
                    },
                },
                comments:{
                    select:{
                        content: true,
                        author:{
                            select:{
                                id: true,
                                name: true,
                                avatar: true
                            }
                        }
                    }
                },
                _count: {
                    select: { likes:true },
                }
                
                
        },
        orderBy: {
            data: "desc",
          },
        where:{
            author:{
                email: email
            }
        }
        })

        data = {
            name : user?.name,
            avatar: user?.avatar,
            posts: posts
        }
    }
    res.send(data)
})



//-----------------------------------------

/*
* POSTS
*/

//-----------------------------------------

app.get("/posts", async function(req:any, res){
    // let id : number = Number(req.query.id)
    let user = await validarToken(req.headers['token'])

    if (user){
        let data = await prisma.post.findMany({
            
            select:{
                id: true,
                content:true,
                data: true,
                imageName:true,
                author: {
                    
                    select: {
                      name: true,
                      email:true,
                      avatar: true
                    },
                }, 
                likes:{
                    select:{
                        id:true,
                    },
                    where:{
                        authorId: user.id
                    },
                },
                comments:{
                    select:{
                        content: true,
                        author:{
                            select:{
                                id: true,
                                name: true,
                                avatar: true
                            }
                        }
                    }
                },
                _count: {
                    select: { likes:true },
                }
                
                
        },
        orderBy: {
            data: "desc",
          },})

        res.send(data)
    } else {
        res.send("")
    }
    
})

app.post("/gravar-post", jsonParser, async function(req: any, res){
    let user = await validarToken(req.headers['token'])
    if (user){
        let id = await prisma.user.findFirst({
            select:{
                id: true
            }, where:{
                email: user.email
            }
        })
        if (id){
           let post = await prisma.post.create({
            data:{
                content : req.body.post,
                authorId: id.id
            }
            }) 
            res.send(post)
            return
    
        }
    }
    res.send("")
    
})

app.post("/gravar-post-img", jsonParser, async function(req: any, res){
    let user = await validarToken(req.headers['token'])
    if (user){
        let id = await prisma.user.findFirst({
            select:{
                id: true
            }, where:{
                email: user.email
            }
        })
        if (id){
           let post = await prisma.post.create({
            data:{
                imageName : req.body.imgName,
                authorId: id.id
            }
            }) 
            res.send(post)
            return
    
        }
    }
    res.send("")
    
})

app.delete("/deletar-post", async function (req: any, res) {
    prisma.post.delete({
        where:{
            id: req.query.id
        }
    })
})


//-----------------------------------------

/*
* LIKE
*/

//-----------------------------------------

app.post("/criar-like", jsonParser, async function(req: any, res) {
    let user = await validarToken(req.headers['token'])
    
    let like = await prisma.like.create({
        data:{
            authorId:user.id,
            postId:req.body.postId
        }
    })    
    res.send(like)
})

app.delete("/remover-like", async function(req: any, res) {
    let idLike : number = Number(req.query.likeId)
    
    let a = await prisma.like.delete({
        where:{
            id:idLike
        }
    })
    
})

async function existeLike(authorId: number, postId: number){
    let like = await prisma.like.findFirst({
        select:{
            id: true
        },
        where:{
            postId : postId,
            authorId: authorId
        }
    })
    return like
}

//-----------------------------------------

/*
* COMMENTS
*/

//-----------------------------------------

app.post("/criar-comment", jsonParser, async function(req: any, res) {
    let user = await validarToken(req.headers['token'])
    
    let commentData ={
        authorId: user.id,
        postId: req.body.postId,
        content: req.body.content
    }

    let comment = await prisma.comment.create({
        data:{
            authorId: commentData.authorId,
            postId: commentData.postId,
            content: commentData.content
        }
    })    
    res.send(comment)
})

app.delete("/remover-comment", async function(req: any, res) {
    let idComment : number = Number(req.query.comment)
    
    await prisma.comment.delete({
        where:{
            id:idComment
        }
    })
})

app.get("/comments", async function(req: any, res){
    let idPost : number = Number(req.query.postId)

    let comments = await prisma.comment.findMany({
        select:{
            content: true,
            id: true,
            author:{
                select:{
                    name: true,
                    avatar: true
                }
            }
        },
        where:{
            postId: idPost
        }
    })
    res.send(comments)
})

//-----------------------------------------

/*
* TESTES
*/

//-----------------------------------------

app.post("/teste-classes/usuario", jsonParser, async function(req, res){
    let usuario = new User(
        req.body.email,
        req.body.password, 
        req.body.name, 
        req.body.avatar, 
    ) 
    
    const user = await prisma.user.create({
        data:{
            email: usuario.email,
            password:await criptografar(usuario.password),
            name: usuario.name,
            avatar: usuario.avatar,
        }
    })


    let criado = await prisma.user.findFirst({
        where: {
            email: usuario.email
    }})
    res.send(criado)
})

app.delete("/teste-classes/del-usuario", async function(req, res){

    const email = req.query.email

    if (email){
        const user = await prisma.user.delete({
            where:{
                email : email.toString()
            }
        })
    }
    
    res.send("")
})

app.put("/teste-classes/alterar-usuario", jsonParser, async function(req, res){

    let usuario = new User(
        req.body.email,
        req.body.password, 
        req.body.name, 
        req.body.avatar, 
    ) 

    const updateUser = await prisma.user.update({
        where: {
          email: usuario.email,
        },
        data: {
          name: usuario.name,
          password:await criptografar(usuario.password) ,
          avatar: usuario.avatar
        },
    })
    
    res.send(updateUser)
})

app.post("/teste-classes/post", jsonParser, async function(req, res){
    let post = new Post(
        req.body.content,
        req.body.authorId
    ) 
    
    const criarPost = await prisma.post.create({
        data:{
            content:post.content,
            authorId:post.authorId
        }
    })


    let criado = await prisma.post.findFirst({
        where: {
            content: post.content
    }})
    res.send(criado)
})

app.post("/teste-classes/all", jsonParser, async function(req, res){
    let usuario = new User(
        req.body.email,
        req.body.password, 
        req.body.name, 
        req.body.avatar, 
    ) 
    
    const user = await prisma.user.create({
        data:{
            email: usuario.email,
            password:await criptografar(usuario.password),
            name: usuario.name,
            avatar: usuario.avatar,
        }
    })
    
    let post = new Post(
        req.body.content,
        req.body.authorId
    ) 
    
    const criarPost = await prisma.post.create({
        data:{
            content:post.content,
            authorId:user.id
        }
    })

    let like = new Like(
        user.id,
        criarPost.id
    )

    const criarLike = await prisma.like.create({
        data:{
            authorId: like.authorId,
            postId: like.postId
        }
    })

    let comment = new Comment(
        user.id,
        criarPost.id,
        req.body.comment
    )

    const criarComment = await prisma.comment.create({
        data:{
            postId: comment.postId,
            authorId: comment.authorId,
            content: comment.comment
        }
    })

    
    let qtdePosts = await prisma.post.aggregate({
        _count: {
            id: true,
            },
        where: {
            data: {
                gte: new Date("2022-10-3"),
                lt:  new Date("2022-10-4")
            },
        },
    })

    let qtdeLikes = await prisma.like.aggregate({
        _count:{
            id:true
        }, 
        where: {
            data: {
                gte: new Date("2022-10-3"),
                lt:  new Date("2022-10-4")
            },
        },
    })  

    let qtdeComments = await prisma.comment.aggregate({
        _count: {
            id: true,
            },
        where: {
            data: {
                gte: new Date("2022-10-3"),
                lt:  new Date("2022-10-4")
            },
        },
    })
    
    let dia = new analiseDia(
        qtdePosts._count.id,
        qtdeLikes._count.id,
        qtdeComments._count.id
    )

    await prisma.like.delete({
        where:{
            id: criarLike.id
        }
    })

    await prisma.comment.delete({
        where:{
            id: criarComment.id
        }
    })

    await prisma.post.delete({
        where:{
            id: criarPost.id
        }
    })
   
    await prisma.user.delete({
        where: {
            email: user.email
        }
    })

    
    res.send(["Usuário:",user,"Post:", criarPost,"Like:", like, "Comentário:", criarComment, "Analise Dia:", dia])
})

app.get("/teste-like", async function(req:any,res){
    let data = await existeLike(Number(req.query.authorId), Number(req.query.postId))
    res.send(data)
})


app.post("/teste-classe/login", jsonParser, async function(req : any,res){
    let data = await prisma.user.findFirst({
        where: {
            email : req.body.email,
            password : await criptografar(req.body.password )   
        }, 
    })
    var resultado = data ? geraToken(req.body.email) : ""
    res.send(resultado)
})


//-----------------------------------------

/*
* UTILS
*/

//-----------------------------------------

async function criptografar(senha : string){
    // const cipher = crypto.createCipher(criptografia.algoritmo, criptografia.segredo);
    // cipher.update(senha);
    // var criptografada = cipher.final(criptografia.tipo);
    const hash = createHash("sha256")
    hash.update(senha)
    var data = hash.digest("hex")
    return data
}

function descriptografar(senha : string) {
    const decipher = crypto.createDecipher(criptografia.algoritmo, criptografia.segredo)
    decipher.update(senha, criptografia.tipo);
    return decipher.final();
};

function geraToken(email: string){
    let jwtSecretKey = criptografia.segredo

    let data = {
        time: Date(),
        email: email,
    }

    const token = jwt.sign(data, jwtSecretKey)
    return token
}

app.get("/passwordCriptographer", async function(req : any,res){
    var criptografada = await criptografar(req.query.password)
res.send(criptografada)
})

app.post("/save-img", upload.single('post'), async function(req : any,res){
        res.send(
        ""
    )
})

app.get("/name-img", async function (req: any, res) {
    res.send( `${req.query.name}-${Date.now()}`)
})


app.get("/validate-token", async function(req: any, res){
let tokenDescripted = jwt.verify(req.query.token, criptografia.segredo)
let data : any
if (typeof tokenDescripted == "object"){
    data = await prisma.user.findFirst({
        select:{
            id: true,
            email: true,
            password: true,
            name: true,
            avatar: true,
        },
        where: {
            email : tokenDescripted.email 
        }, 
    })

}
res.send(data)
})


async function validarToken(token : string){
    let tokenDescripted = jwt.verify(token, criptografia.segredo)
    let data : any
    if (typeof tokenDescripted == "object"){
        data = await prisma.user.findFirst({
            select:{
                id: true,
                email: true,
                password: true,
                name: true,
                avatar: true,
            },
            where: {
                email : tokenDescripted.email 
            }, 
        })
    
    }
    return data
}

async function verifyEmailExistence(email: string){
    const user = await prisma.user.findUnique({
        select: {
            email:true
        },where:{
            email: email
        }
    })

    return user
}

async function verifyPassword(email: string, password: String){
    const user = await prisma.user.findUnique({
        select: {
            email:true,
            password: true
        },where:{
            email: email
        }
    })

    return user?.password == password && user.password != null

}


app.listen(process.env.PORT || 3000)