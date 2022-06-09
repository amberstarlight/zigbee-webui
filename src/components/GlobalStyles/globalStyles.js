import '../../font.css';
import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
 html,
 body {
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font: 18px 'rubikregular', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  height: 100vh;
  width: 100%;

  transition: background 0.5s linear,
              color 0.5s linear;
 }
`;

const colours = {
  platinum: '#E7E5E5',
  violet: '#6F73D2',
  deepGrey: '#18181B',
  midGrey: '#3C3C3C',
  red: '#FD151B',
  spaceBlue: '#2B3A67',
};

export const lightTheme = {
  text: colours.deepGrey,
  background: colours.platinum,
  accent: colours.violet,
  shadow: 'rgba(0, 0, 0, 0.25)',
  hover: 'rgba(0, 0, 0, 0.05)',
};

export const darkTheme = {
  text: colours.platinum,
  background: colours.deepGrey,
  accent: colours.red,
  shadow: 'rgba(0, 0, 0, 0.5)',
  hover: 'rgba(255, 255, 255, 0.05)',
};

export const SettingsGrid = styled.div`
  display: inline-grid;
  align-items: center;
  grid-template-columns: ${(props) => {
    if (props.type === 'device') {
      return '1fr 8fr 1fr;';
    } else if (props.type === 'presets') {
      return 'repeat(6, 1fr);';
    }
  }}

  column-gap: 1em;
  width: 100%;

  @media only screen and (max-width: 700px) {
    grid-template-columns: 8em 8em 1fr;
  }
`;
