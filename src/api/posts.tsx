const createImage = async (url:string, postId:number) => {
   try {
        const response = await fetch('http://localhost:3001/postimages', {
            method:"POST",
            headers: {
                "Content-Type":"application/json",
            },
            body:JSON.stringify({url, postId}),
        })
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const newImage:any = await response.json()
        return newImage
    }
    catch (error:any) {
        console.log("Error del servidor: ", error.message)
        return error
    }
}
export const createImages = async (images:string[], postId:number) => {
    try {
        return await Promise.all(images.map((i) => createImage(i, postId)))
    }
    catch (error:any) {
        console.log("Error del servidor: ", error.message)
        return false
    }
}

export const createPost = async (postAttributes:any) => {
    try {
        const response = await fetch('http://localhost:3001/posts', {
            method:"POST",
            headers: {
                "Content-Type":"application/json",
            },
            body:JSON.stringify(postAttributes),
        })
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const newPost:any = await response.json()
        return newPost
    }
    catch (error:any) {
        console.log("Error del servidor: ", error.message)
        return false
    }
};

export const getPostById = async (id:number) => {
    try {
        const response = await fetch(`http://localhost:3001/posts/${id}`)
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const post:any = await response.json()
        console.log(post)
        return post
    }
    catch (error:any) {
        console.log("Error del servidor: ", error.message)
        return false
    }
};

export const getUserPosts = async (id:number) => {
    try {
        const response = await fetch(`http://localhost:3001/posts?userId=${id}`)
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const posts:any = await response.json()
        console.log(posts)
        return posts
    }
    catch (error:any) {
        console.log("Error del servidor: ", error.message)
        return error
    }
};

