import type { userBD } from "../Types/Types";

export const getUserByAttribute = async (attribute:any) => {
    try {
        const response = await fetch('http://localhost:3001/users')
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const users:any = await response.json()
        const attributeKey:string = Object.keys(attribute)[0]
        return users.find((u:any) => u[attributeKey] == attribute[attributeKey])
    }
    catch (error:any) {
        console.log("Error del servidor: ", error.message)
        return false
    }
};

export const createUser = async (userAttributes:any) => {
    try {
        const response = await fetch('http://localhost:3001/users', {
            method:"POST",
            headers: {
                "Content-Type":"application/json",
            },
            body:JSON.stringify(userAttributes),
        })
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const newUser:any = await response.json()
        return newUser
    }
    catch (error:any) {
        console.log("Error del servidor: ", error.message)
        return false
    }
};