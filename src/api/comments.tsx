export const getPostComments = async (id:number) => {
    try {
        const response = await fetch(`http://localhost:3001/comments/post/${id}`)
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const comments:any = await response.json()
        console.log(comments)
        return comments
    }
    catch (error:any) {
        console.log("Error del servidor: ", error.message)
        return false
    }
};
