import styled from 'styled-components';

const SliderContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  justify-items: center;

  grid-template-columns: 1fr 8fr 1fr;
  column-gap: 1em;
`;

const StyledSlider = styled.input.attrs((props) => ({
  type: 'range',
  disabled: props.disabled || false,
}))`
  appearance: none;
  border: none;
  display: block;
  width: 100%;
  height: 1em;
  border-radius: 1em;
  background: ${({ theme }) => theme.shadow};
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
  margin: 3em 0em;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 2em;
    height: 2em;
    border-radius: 50%;
    background: ${({ theme }) => theme.accent};
    cursor: pointer;
  }
`;

function Slider(props) {
  return (
    <SliderContainer>
      {props.label}
      <StyledSlider
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onChange={props.onChange}
      />
      <output>
        {props.displayValue || props.value}
        {props.displayUnit}
      </output>
    </SliderContainer>
  );
}

export default Slider;
