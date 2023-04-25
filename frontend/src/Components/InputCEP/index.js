import { Form } from 'react-bootstrap';
import InputMask from 'react-input-mask';

const CEPInput = props => {
    return (
      <InputMask
        mask='99999999'
        value={props.value}
        onChange={props.onChange}>
        {() => (
          <Form.Control
          type="text"
          id="cepInput"
          aria-describedby="cpfTextInput"
          placeholder='Digite seu CEP (apenas números)'
        />
        )}
      </InputMask>
    );
}

export default CEPInput;