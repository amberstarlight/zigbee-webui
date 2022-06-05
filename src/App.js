import { useEffect, useState } from 'react';
import * as mqttService from './services/mqttService';
import { Link, Route, useLocation } from 'wouter';

import styled, { ThemeProvider } from 'styled-components';
import {
  GlobalStyles,
  lightTheme,
  darkTheme,
} from './components/GlobalStyles/globalStyles';
import { useDarkMode } from './components/UseDarkMode/useDarkMode';

import Devices from './pages/Devices/Devices';
import Settings from './pages/Settings/Settings';

import Button from './components/Button/Button';
import DeviceSettings from './components/DeviceSettings/DeviceSettings';

const options = {
  reconnectPeriod: 10000,
};

const Wrapper = styled.div`
  padding: 2em;
  height: 100%;
`;

const NavBar = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 1em;
  margin-bottom: 2em;
`;

function App() {
  const [devices, setDevices] = useState();
  const [bridgeState, setBridgeState] = useState();
  const [theme] = useDarkMode();
  const [location] = useLocation();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  useEffect(() => {
    mqttService.init(options, setBridgeState);
    mqttService.getDevices().then(setDevices);
  }, []);

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <Wrapper>
        <NavBar>
          <Link href={'/devices'}>
            <Button text={'Devices'} />
          </Link>
          <Link href={'/groups'}>
            <Button text={'Groups'} />
          </Link>
          <Link href={'/settings'}>
            <Button text={'Settings'} />
          </Link>
        </NavBar>

        <h1>{decodeURI(location)}</h1>

        <Route path={'/devices'}>
          <Devices devices={devices} />
        </Route>

        <Route path={'/devices/:friendlyName'}>
          {(params) => {
            if (!devices) return <></>;

            const device = devices.find(
              (device) =>
                Object.prototype.hasOwnProperty.call(device, 'friendly_name') &&
                device.friendly_name === decodeURIComponent(params.friendlyName)
            );

            if (!device)
              return (
                <>
                  <p>That device does not exist on the network.</p>
                  <Link href={'/devices'}>
                    <Button text={'Go Back'} />
                  </Link>
                </>
              );

            return <DeviceSettings device={device} />;
          }}
        </Route>

        <Route path={'/settings'}>
          <Settings bridgeState={bridgeState} />
        </Route>
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
