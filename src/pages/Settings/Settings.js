import * as mqttService from '../../services/mqttService';

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
      <>
        <h3>Device Pairing</h3>
        <Toggle
          key={'permitJoin'}
          checked={permitJoin}
          onChange={() => {
            mqttService.sendMqttMessage(
              'zigbee2mqtt/bridge/request/permit_join',
              { value: !permitJoin }
            );
          }}
        />
        <p>Devices can{permitJoin ? '' : 'not'} join the network.</p>
      </>
    );
  }

  return <>{settingsContent !== undefined ? settingsContent : ''}</>;
}

export default Settings;
