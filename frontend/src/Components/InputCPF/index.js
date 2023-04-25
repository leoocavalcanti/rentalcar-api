import { Form } from 'react-bootstrap';
import InputMask from 'react-input-mask';

const CPFInput = props => {
    return (
      <InputMask
        mask='999.999.999-99'
        value={props.value}
        onChange={props.onChange}>
        {() => (
          <Form.Control
          type="text"
          id="cpfInput"
          aria-describedby="cpfTextInput"
          placeholder='Digite seu CPF (apenas números)'
        />
        )}
      </InputMask>
    );
}

export default CPFInput;