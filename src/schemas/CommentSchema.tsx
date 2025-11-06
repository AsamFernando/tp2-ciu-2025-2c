import * as yup from 'yup';

export const commentSchema = yup.object().shape({
    comentarioNuevo: yup
        .string()
        .trim('No puede contener solo espacios')
        .min(2, 'La descripcion debe tener ${min} caracteres como minimo')
        .max(250, 'La descripcion debe tener ${max} caracteres máximo')
        .required('Debe ingresar una descripcion')
});