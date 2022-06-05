import styled from 'styled-components';

const Picker = styled.input`
  appearance: none;
  display: block;
  width: 5em;
  height: 5em;
  border: none;
  background: none;
`;

function ColorPicker(props) {
  return (
    <>
      <label>
        {props.label}
        <Picker type="color" value={props.value} onChange={props.onChange} />
      </label>
      <p>{props.value}</p>
    </>
  );
}

export default ColorPicker;
