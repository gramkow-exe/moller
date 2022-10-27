import express from "express";
var cors = require('cors')
import { PrismaClient } from "@prisma/client";
import crypto, {Encoding} from "crypto"
import bodyParser from "body-parser"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { analiseDia, Comment, Like, Post, User } from "./models";


const prisma = new PrismaClient()
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
dotenv.config();


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
app.use(cors())

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
            password: criptografar(usuario.password)
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

app.post("/login", jsonParser, async function(req : any,res){
    let data = await prisma.user.findFirst({
        where: {
            email : req.body.email,
            password : req.body.password   
        }, 
    })
    var resultado = data ? geraToken(req.body.email) : ""
    res.send(resultado)
})

app.delete("/delete-user", jsonParser, async function(req : any,res){
    const userToDelete = await prisma.user.findFirst({
        where:{
            password: criptografar(req.body.password)
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

//-----------------------------------------

/*
* POSTS
*/

//-----------------------------------------

app.get("/posts", async function(req:any, res){
    let id : number = Number(req.query.id)

    let data = await prisma.post.findMany({
            
        select:{
            id: true,
            content:true,
            data: true,
            author: {
                
                select: {
                  name: true,
                  avatar: true
                },
            }, 
            likes:{
                select:{
                    id:true,
                },
                where:{
                    authorId: id
                },
            },
            _count: {
                select: { likes:true },
            }
            
            
    },
    orderBy: {
        data: "desc",
      },})


    res.send(data)
})

app.post("/gravar-post", jsonParser, async function(req: any, res){
    let id = await prisma.user.findFirst({
        select:{
            id: true
        }, where:{
            email: req.body.emailUsuario
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

    }else{
        res.send("")
    }

    
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
    let like = await prisma.like.create({
        data:{
            authorId:req.body.authorId,
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
    let commentData ={
        authorId: req.body.authorId,
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
            password:criptografar(usuario.password),
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
          password: criptografar(usuario.password) ,
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
            password:criptografar(usuario.password),
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
            password : criptografar(req.body.password )   
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

function criptografar(senha : string){
    const cipher = crypto.createCipher(criptografia.algoritmo, criptografia.segredo);
    cipher.update(senha);
    var criptografada = cipher.final(criptografia.tipo);
    return criptografada
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
    var criptografada = criptografar(req.query.password)
res.send(criptografada)
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





app.listen(process.env.PORT || 3000)