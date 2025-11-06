import * as yup from 'yup';

export const descripcionSchema = yup.object().shape({
    descripcion: yup
        .string()
        .trim('No puede contener solo espacios')
        .min(2, 'La descripcion debe tener ${min} caracteres como minimo')
        .max(250, 'La descripcion debe tener ${max} caracteres máximo')
        .required('Debe ingresar una descripcion')
});

export const imagenSchema = yup.object().shape({
    url: yup
        .string()
        .trim('No puede contener solo espacios')
        .url('Debe ingresar una url valida')
});

export const descripcionUrlSchema = yup.object().shape({
    descripcion: yup
        .string()
        .trim('No puede contener solo espacios')
        .min(2, 'La descripcion debe tener ${min} caracteres como minimo')
        .max(250, 'La descripcion debe tener ${max} caracteres máximo')
        .required('Debe ingresar una descripcion'),
    url: yup
    .string()
    .url('Debe ingresar una url valida')
});