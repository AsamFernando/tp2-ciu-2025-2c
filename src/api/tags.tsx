export const getTags = async () => {
    try {
        const response = await fetch('http://localhost:3001/tags')
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const tags:any = await response.json()
        console.log(tags)
        return tags
    }
    catch (error:any) {
        console.log("Error del servidor: ", error.message)
        return false
    }
};