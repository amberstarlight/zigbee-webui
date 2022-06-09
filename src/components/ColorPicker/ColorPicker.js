import styled from 'styled-components';
import { SettingsGrid } from '../GlobalStyles/globalStyles';

const Picker = styled.input`
  appearance: none;
  display: block;
  width: 100%;
  height: 5em;
  border: none;
  background: none;
`;

function ColorPicker(props) {
  return (
    <>
      <SettingsGrid type={'device'}>
        {props.label}
        <Picker type="color" value={props.value} onChange={props.onChange} />
        <output>{props.value}</output>
      </SettingsGrid>
    </>
  );
}

export default ColorPicker;
