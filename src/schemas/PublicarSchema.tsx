import * as yup from 'yup';

// export const descripcionSchema = yup.object().shape({
//     descripcion: yup
//         .string()
//         .trim('No puede contener solo espacios')
//         .min(2, 'La descripcion debe tener ${min} caracteres como minimo')
//         .max(10, 'La descripcion debe tener ${max} caracteres máximo')
//         .required('Debe ingresar una descripcion')
// });

// export const imagenSchema = yup.object().shape({
//     imagen: yup
//         .string()
//         .url('Debe ingresar una url valida')
// });

export const descripcionSchema = yup.object().shape({
    descripcion: yup
        .string()
        .trim('No puede contener solo espacios')
        .min(2, 'La descripcion debe tener ${min} caracteres como minimo')
        .max(10, 'La descripcion debe tener ${max} caracteres máximo')
        .required('Debe ingresar una descripcion'),
    imagen: yup
    .string()
    .url('Debe ingresar una url valida')
});