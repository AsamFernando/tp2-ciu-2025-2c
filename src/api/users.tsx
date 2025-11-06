import type { UserBDType } from "../Types/Types";

export const getUserByAttribute = async (attribute:any) => {
    try {
        const response = await fetch('http://localhost:3001/users')
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const users:UserBDType[] = await response.json()
        console.log(users)
        const attributeKey:string = Object.keys(attribute)[0]
        return users.find((u:any) => u[attributeKey] == attribute[attributeKey])
    }
    catch (error:any) {
        console.log("Error del servidor: ", error.message)
        return error
    }
};
//{id:0, nickName:"", email:""}
export const createUser = async (userAttributes:UserBDType) => {
    try {
        const response = await fetch('http://localhost:3001/users', {
            method:"POST",
            headers: {
                "Content-Type":"application/json",
            },
            body:JSON.stringify(userAttributes),
        })
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const newUser:UserBDType = await response.json()
        return newUser
    }
    catch (error:any) {
        console.log("Error del servidor: ", error.message)
        return error
    }
};