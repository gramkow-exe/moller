export class User {
    email : string  
    password : string  
    name : string
    avatar : string 

    constructor( email:string, password: string, name: string, avatar: string){
        this.email = email; 
        this.password = password;
        this.name = name;
        this.avatar = avatar;  
    }
  }
  
export class Post {
    content : string; 
    authorId : number;

    constructor(content:string, authorId: number){
        this.content = content; 
        this.authorId = authorId;
    }
}

export class Like{
    authorId : number
    postId: number

    constructor(authorId: number, postId: number ){
        this.authorId = authorId
        this.postId = postId
    }
}

export class Comment{
    authorId : number
    postId: number
    comment: string

    constructor(authorId: number, postId: number, comment: string ){
        this.authorId = authorId
        this.postId = postId
        this.comment = comment
    }
}

export class analiseDia{
    qtdePosts:    number
    qtdeLikes:    number
    qtdeComments: number

    constructor(qtdePosts: number, qtdeLikes: number, qtdeComments: number ){
        this.qtdePosts = qtdePosts
        this.qtdeLikes = qtdeLikes
        this.qtdeComments = qtdeComments
    }
}


