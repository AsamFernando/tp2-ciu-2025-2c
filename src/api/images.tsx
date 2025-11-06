import type { imageBDType } from "../Types/Types";

export const getPostImages = async (id:number) => {
    try {
        const response = await fetch(`http://localhost:3001/postimages/post/${id}`)
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const images:imageBDType[] = await response.json()
        console.log(images)
        return images
    }
    catch (error:any) {
        console.log("Error del servidor: ", error.message)
        return error
    }
};
