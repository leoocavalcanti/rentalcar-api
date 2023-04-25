import { Form } from 'react-bootstrap';
import InputMask from 'react-input-mask';

const CNHInput = props => {
    return (
      <InputMask
        mask='99999999999'
        value={props.value}
        onChange={props.onChange}>
        {() => (
          <Form.Control
          type="text"
          id="cnhInput"
          aria-describedby="cnhTextInput"
          placeholder='Digite seu número de registro da CNH (apenas números)'
        />
        )}
      </InputMask>
    );
}

export default CNHInput;