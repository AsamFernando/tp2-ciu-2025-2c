import type { userBD } from "../Types/Types";

export const getUserByNickName = async (nickName:string|undefined) => {
    try {
        const response = await fetch('http://localhost:3001/users')
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const users = await response.json()
        return users.find((u:userBD) => u.nickName == nickName)
    }
    catch (error:any) {
        console.log("Error del servidor: ", error.message)
        return false
    }
};