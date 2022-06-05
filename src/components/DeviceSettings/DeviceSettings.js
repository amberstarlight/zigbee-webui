import { useState, useEffect } from 'react';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import {
  checkForDeviceUpdate,
  getDeviceSettings,
  setDeviceFriendlyName,
} from '../../services/mqttService';
import { deviceSettingsGenerator } from './generator';
import EditableText from '../EditableText/EditableText';
import { deviceDescription } from '../../utils/deviceUtilities';
import Button from '../Button/Button';

function DeviceSettings(props) {
  const [deviceSettingsState, setDeviceSettingsState] = useState();
  const [deviceFriendlyNameState, setDeviceFriendlyNameState] = useState(
    props.device.friendly_name
  );

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
      <div>
        <EditableText
          text={deviceFriendlyNameState}
          fontSize={'2em'}
          onChange={(event) => {
            const newFriendlyName = event.target.value;
            setDeviceFriendlyNameState(newFriendlyName);
          }}
          onEditFinish={() => {
            setDeviceFriendlyName(
              props.device.friendly_name,
              deviceFriendlyNameState
            );
          }}
        />
        <h3>{deviceDescription(deviceDefinition)}</h3>
      </div>

      <div>
        {deviceSettingsGenerator(
          props.device,
          deviceSettingsState,
          setDeviceSettingsState
        )}
      </div>

      <div>
        <Button
          text="Check for Update"
          onClick={() =>
            checkForDeviceUpdate(props.device.friendly_name).then((res) => {
              if (res.update_available) {
                console.log('Update available!');
              } else {
                console.log('No update available.');
              }
            })
          }
        ></Button>
      </div>
    </>
  );
}

export default DeviceSettings;
