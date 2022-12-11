import React, { useContext, useEffect, useState } from "react";
import { userPage } from "../api";
import Post from "../components/Post";

interface props {
    email: string
}

interface UserInfo{
    name:string,
    avatar:string,
    posts:Array<Post>,

}

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

  interface Comment{
    content: string,
    author: Author
  }
  interface _count{
      likes: number
  }
  
  interface Author{
    name: String,
    email: string,
    avatar: string
  }
  interface Like{
    id: number
  }


export default function UserPage(props: props){
    const[userInfo, setUserInfo] = useState<UserInfo | null>(null)

    useEffect(()=>{
        getInfo()
    },[])

    async function getInfo(){
        let data = await userPage(props.email)
        setUserInfo(data)
    }

    return(
        <>
            <div className="text-white w-[80%] h-screen">
                <div className="h-[30%] border-b-fuchsia-400/30 border-b-2 border-pointed block">
                    <div className=" h-[55%]">
                        
                    </div>
                    <div className="flex">
                        <div className="rounded-full w-32 h-32 ml-6 mt-[-4%]   bg-no-repeat bg-center bg-cover " style={{backgroundImage:`url("${userInfo?.avatar}")`}}></div>
                        <p className="text-xl mt-4 ml-4">{userInfo?.name}</p>
                    </div>

                    
                    
                </div>
                <div className="p-4">
                    {userInfo?.posts && userInfo?.posts.map((post)=> {
                        return(<Post post={post}/>)
                    })}

                </div>
            </div>


        </>
    )
}