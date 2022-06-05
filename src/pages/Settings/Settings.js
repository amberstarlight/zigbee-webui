import { sendMqttMessage } from '../../services/mqttService';

import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Toggle from '../../components/Toggle/Toggle';

function Settings(props) {
  let settingsContent = undefined;

  if (!props.bridgeState) {
    settingsContent = <LoadingSpinner />;
  }

  if (props.bridgeState) {
    const permitJoin = props.bridgeState.permit_join;

    settingsContent = (
      <div>
        <h3>Device Pairing</h3>
        <Toggle
          key={'permitJoin'}
          checked={permitJoin}
          onChange={() => {
            sendMqttMessage('zigbee2mqtt/bridge/request/permit_join', {
              value: !permitJoin,
            });
          }}
        />
        <p>Devices can{permitJoin ? '' : 'not'} join the network.</p>
      </div>
    );
  }

  return <>{settingsContent !== undefined ? settingsContent : ''}</>;
}

export default Settings;

{
  /* <h3>Devices</h3>
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
</div> */
}
