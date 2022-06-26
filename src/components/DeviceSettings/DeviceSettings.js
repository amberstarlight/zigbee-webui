// SPDX-License-Identifier: GPL-3.0-or-later

import { useState, useEffect } from 'react';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { getDeviceSettings } from '../../services/mqttService';
import { deviceSettingsGenerator } from './generator';
import { deviceDescription } from '../../utils/deviceUtilities';

function DeviceSettings(props) {
  const [deviceSettingsState, setDeviceSettingsState] = useState();

  if (!props.device.supported)
    return <p>This device exposes nothing that can be controlled.</p>;

  const features = props.device.definition.exposes[0].features;

  useEffect(() => {
    let properties = {};

    features.forEach((property) => {
      properties[property.name] = '';
    });

    getDeviceSettings(props.device.friendly_name, properties).then(
      setDeviceSettingsState
    );
  }, []);

  if (!deviceSettingsState) return <LoadingSpinner />;

  let deviceDefinition = props.device.definition;

  return (
    <>
      <h3>{deviceDescription(deviceDefinition)}</h3>
      {deviceSettingsGenerator(
        props.device,
        deviceSettingsState,
        setDeviceSettingsState
      )}
    </>
  );
}

export default DeviceSettings;
