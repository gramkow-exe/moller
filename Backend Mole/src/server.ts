import express from "express";
var cors = require('cors')
import { PrismaClient } from "@prisma/client";
import crypto, {Encoding} from "crypto"
import bodyParser from "body-parser"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { analiseDia, Comment, Like, Post, User } from "./models";
import { WhereToVote } from "@mui/icons-material";


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

app.get("/posts", async function(req, res){
    let data = await prisma.post.findMany({
        select:{
            content:true,
            data: true,
            author: {
                
                select: {
                  name: true,
                  avatar: true
                },
            },
            
    },
    orderBy: {
        data: "desc",
      },})
    res.send(data)
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
                id: false,
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

app.listen(3000)