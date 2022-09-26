import express from "express";
var cors = require('cors')
import { PrismaClient } from "@prisma/client";
import crypto, {Encoding} from "crypto"
import bodyParser from "body-parser"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { User } from "phosphor-react";

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
    }})
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