import React from "react";

interface Comment{
  content: string,
  author: Author
}
interface Author{
  name: String,
  email: string,
  avatar: string
}

interface Props{
  comment : Comment,
  id: number
}
export default function Comment(props: Props){
  const comment = props.comment

  return(
    <div className="m-2 border-white/40 border-2 rounded p-2 ml-4 hover:border-fuchsia-400/50 transition-all">
      <div className="flex items-center">
        <div className="rounded-full w-6 sm:w-8 bg-no-repeat bg-center bg-cover h-6 sm:h-8" style={{backgroundImage:`url("${comment.author.avatar}")`}}></div>
        <div className="text-white ml-2">
          <p className="text-sm sm:text-md">{comment.author.name}</p>
        </div>
      </div>

      <div className="mt-2 text-sm sm:text-md">
        {comment.content}
      </div>
    </div>
  )
}