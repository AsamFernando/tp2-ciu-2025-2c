import type { commentBDType } from "../Types/Types";

export const getPostComments = async (id:number) => {
    try {
        const response = await fetch(`http://localhost:3001/comments/post/${id}`)
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const comments:commentBDType = await response.json()
        console.log(comments)
        return comments
    }
    catch (error:any) {
        console.log("Error del servidor: ", error.message)
        return false
    }
};

export const createComment = async (commentAttributes:{content:string, userId:number, postId:number}) => {
    try {
        const response = await fetch('http://localhost:3001/comments', {
            method:"POST",
            headers: {
                "Content-Type":"application/json",
            },
            body:JSON.stringify(commentAttributes),
        })
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const newComment:commentBDType = await response.json()
        return newComment
    }
    catch (error:any) {
        console.log("Error del servidor: ", error.message)
        return error
    }
};
