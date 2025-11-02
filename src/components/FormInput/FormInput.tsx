import {Form, FloatingLabel} from 'react-bootstrap';
import type { inputsLoginType} from '../../Types/Types';

const FormInput = ({controlId, label, errores, ...rest}:inputsLoginType) => {
    return (
        <div>
            <FloatingLabel
                controlId={controlId}
                label={label}
                className="mb-3"
            >
                <Form.Control
                    {...rest}
                    type="text"
                    isInvalid={!!errores?.[rest.name]}
                />
                <Form.Control.Feedback type="invalid">
                    {errores?.[rest.name]}
                </Form.Control.Feedback>
            </FloatingLabel>
        </div>
    )
}

export default FormInput;