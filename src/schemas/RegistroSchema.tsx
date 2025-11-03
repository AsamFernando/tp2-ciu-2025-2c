import * as yup from 'yup';
import { getUserByAttribute } from '../api/users';

export const registroSchema = yup.object().shape({
    nickName: yup
        .string()
        .required('Debe ingresar un nickName')
        .test(
            'user registrado',
            "El nickName ya se encuentra registrado",
            async (nickName) => {
                if(!nickName) return true
                const userFound = await getUserByAttribute({nickName})
                return nickName != userFound?.nickName
            }
        ),
        
    email: yup
        .string()
        .required('Debe ingresar un email')
        .email('Debe ingresar un email valido')
        .test(
            'email registrado',
            "El email ya se encuentra registrado",
            async (email) => {
                if(!email) return true
                const userFound = await getUserByAttribute({email})
                return email != userFound?.email
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
        
    email: yup
        .string()
        .trim('No puede contener solo espacios')
        .required('Debe ingresar un email')
        .email('Debe ingresar un email valido')
});