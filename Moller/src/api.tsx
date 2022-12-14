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
    comments: Array<Comment>,
    _count: _count,
    imageName: String
}

interface _count{
    likes: number
}

interface Author{
    name: String,
    email: string,
    avatar: string
}

interface User{
    id: number,
    email: string,
    password: string,
    name: string,
    avatar: string
}

interface Comment{
    content: string,
    author: Author
}

interface Like{
    id: number
}

interface UserInfo{
    name:string,
    avatar:string,
    posts:Array<Post>,

}

export async function loadPosts(id:number): Promise<Post[]>{
    return await axios.get(`${ipBackend}posts`, {
        headers : {
            'token' : localStorage.getItem("token") || ""
    }}).then((response: AxiosResponse) => { 
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

export function getIp(){
    return ipBackend
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
        post
    }, {
        headers : {
            'token' : localStorage.getItem("token") || ""
    }}).then((response: AxiosResponse) => { 
        let data: User | null = response.data;
        return(data)
    })
}

export async function criarLike(postId : number, authorId : number): Promise<Like | null>{
    return await axios.post(`${ipBackend}criar-like`, {
        postId
    }, {
        headers : {
            'token' : localStorage.getItem("token") || ""
    }}).then((response: AxiosResponse) => { 
        let data: Like | null = response.data;
        return(data)
    })
}

export async function removerLike(likeId: Number){
    await axios.delete(`${ipBackend}remover-like?likeId=${likeId}`)
}

export async function alterarUsuario(email: string, emailForm: string, nome: string, avatar: string): Promise<User | null>{
    return await axios.put(`${ipBackend}alterar-usuario`, {
        email, emailForm, nome, avatar
    }).then((response: AxiosResponse) => { 
        let data: User | null = response.data;
        return(data)
    })
}

export async function criarComment(postId: Number, authorId : Number, content: String): Promise<Comment | null>{
    return await axios.post(`${ipBackend}criar-comment`, {
        postId, content
    }, {
        headers : {
            'token' : localStorage.getItem("token") || ""
    }}).then((response: AxiosResponse) => { 
        let data: Comment | null = response.data;
        return(data)
    })
}

export async function changePassword(email: String, oldPassword: String, newPassword: String): Promise<Comment | null>{
    return await axios.put(`${ipBackend}change-password`, {
        email, oldPassword, newPassword
    }, {
        headers : {
            'token' : localStorage.getItem("token") || ""
    }}).then((response: AxiosResponse) => { 
        let data: Comment | null = response.data;
        return(data)
    })
}

export async function userPage(email: String): Promise<UserInfo | null>{
    return await axios.get(`${ipBackend}user-page`, {
        params:{
            email
        },
        headers : {
            'token' : localStorage.getItem("token") || ""
    }
    }).then((response: AxiosResponse) => { 
        let data: UserInfo | null = response.data;
        return(data)
    })
}


export async function saveImg(formdata: any, name: String): Promise<String | null>{
    return await axios.post(`${ipBackend}save-img`, formdata, {
        params: {
            name
        }
    }).then((response: AxiosResponse) => { 
        let data: String | null = response.data;
        return(data)
    })
}

export async function nameImg(name: String): Promise<String | null>{
    return await axios.get(`${ipBackend}name-img`, {params:{
        name
    }}).then((response: AxiosResponse) => { 
        let data: String | null = response.data;
        return(data)
    })
}

export async function gravarPostImg(imgName : String): Promise<User | null>{
    return await axios.post(`${ipBackend}gravar-post-img`, {
        imgName
    }, {
        headers : {
            'token' : localStorage.getItem("token") || ""
    }}).then((response: AxiosResponse) => { 
        let data: User | null = response.data;
        return(data)
    })
}


