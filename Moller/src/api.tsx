import axios, {AxiosResponse} from "axios"
import { useContext, useState } from "react";
import AppCtx from "./Context";

var ipBackend = ""

interface Post{
    id: number,
    content: String,
    data: String,
    author: Author,
    likes: Array<Like>,
    _count: _count
}

interface _count{
    likes: number
}

interface Author{
    name: String,
    avatar: string
}

interface User{
    id: number,
    email: string,
    password: string,
    name: string,
    avatar: string
}

interface Like{
    id: number
}

export async function loadPosts(id:number): Promise<Post[]>{
    return await axios.get(`${ipBackend}posts?id=${id}`).then((response: AxiosResponse) => { 
        let data: Post[] = response.data;
        return(data)
    })
}

export async function logar(email : string, password : string): Promise<string>{
    return await axios.post(`${ipBackend}login`, {
        email, password
    }).then((response: AxiosResponse) => { 
        let data: string = response.data;
        return(data)
    })
}

export function setIp(ip:string){
    ipBackend = ip
}

export async function register(email : string, password : string, name:string, avatar:string) : Promise<string>{
    return await axios.post(`${ipBackend}create-account`, {
        email, password, name, avatar
    }).then((response: AxiosResponse) => { 
        let data: string = response.data;
        return(data)
    })
}

export async function criptografar(password : string): Promise<string>{
    return await axios.get(`${ipBackend}passwordCriptographer`, {params: {
        password
    }}).then((response: AxiosResponse) => { 
        let data: string = response.data;
        return(data)
    })
}

export async function validateToken(token : string): Promise<User | null>{
    return await axios.get(`${ipBackend}validate-token`, {params: {
        token
    }}).then((response: AxiosResponse) => { 
        let data: User | null = response.data;
        return(data)
    })
}

export async function gravarPost(post : string, emailUsuario : string): Promise<User | null>{
    return await axios.post(`${ipBackend}gravar-post`, {
        post, emailUsuario
    }).then((response: AxiosResponse) => { 
        let data: User | null = response.data;
        return(data)
    })
}

export async function criarLike(postId : number, authorId : number): Promise<Like | null>{
    return await axios.post(`${ipBackend}criar-like`, {
        postId, authorId
    }).then((response: AxiosResponse) => { 
        let data: Like | null = response.data;
        return(data)
    })
}

export async function removerLike(likeId: Number){
    await axios.delete(`${ipBackend}remover-like?likeId=${likeId}`)
}