import {Form, Button} from 'react-bootstrap';
import type { inputsLoginType} from '../../Types/Types';

const imagenesBtn = (nombreInput:string, onClick:any) => {
    if(nombreInput == 'url') {
        return (
            <Button
                className='w-100'
                variant='warning'
                size='sm'
                style={{marginTop:'10px', fontSize:'12px', color:'black', fontWeight:'bold' }}
                onClick={onClick}
                >
                Cargar imagen
            </Button>
        )
    }
}

const FormInput = ({controlId, label, errores, onClick, ...rest}:inputsLoginType) => {
    return (
        <div className="form-floating text-align-center mb-3">
            <br />
            <Form.Control
                {...rest}
                size='sm'
                type="text"
                isInvalid={!!errores?.[rest.name]}
                />
            <label style={{margin:1, padding:'2.3rem 0.8rem'}} htmlFor={controlId}>{label}</label>
            <Form.Control.Feedback type="invalid">
                {errores?.[rest.name]}
            </Form.Control.Feedback>
            {imagenesBtn(rest.name, onClick)}
        </div>
    )
}

export default FormInput;