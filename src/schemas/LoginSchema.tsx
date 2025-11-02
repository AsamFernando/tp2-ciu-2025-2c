import * as yup from 'yup';
import { getUserByNickName } from '../api/users';

export const loginSchema = yup.object().shape({
    nickName: yup
        .string()
        .required('Debe ingresar un nickName')
        .test(
            'user registrado',
            "El nickName no se encuentra registrado",
            async (nickName) => {
                if(!nickName) return true
                const userFound = await getUserByNickName(nickName)
                return nickName == userFound?.nickName
            }
        ),
        
    contraseña: yup
        .string()
        .required('Debe ingresar una contraseña')
        .test(
            'es-123456',
            "La contraseña es incorrecta",
            (password) => {
                if(password === "") return true
                return password == '123456'
            }
        )
});

export const inputSchema = yup.object().shape({
    nickName: yup
        .string()
        .trim('No puede contener solo espacios')
        .min(2, 'El nickName debe tener ${min} caracteres como minimo')
        .max(12, 'El nickName debe tener ${max} caracteres máximo')
        .required('Debe ingresar un nickName'),
        
    contraseña: yup
        .string()
        .trim('No puede contener solo espacios')
        .required('Debe ingresar una contraseña')
});