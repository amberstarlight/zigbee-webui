import { deviceDescription } from '../../utils/deviceUtilities';
import styled from 'styled-components';

const emojiLookup = {
  light: '💡',
  switch: '🔌',
  fan: '🌡️',
  cover: '🪟',
  lock: '🔒',
  climate: '❄️️',
};

const Card = styled.div`
  margin: 2em 0em;
  padding: 1em;
  cursor: pointer;
  border-radius: 2rem;

  &:hover {
    background-color: ${({ theme }) => theme.hover};
  }
`;

function DeviceCard(props) {
  let deviceEmoji = '❓';
  let deviceDefinition = props.device.definition;

  if (deviceDefinition && deviceDefinition.exposes.length > 0) {
    deviceEmoji = emojiLookup[deviceDefinition.exposes[0].type];
  }

  return (
    <Card onClick={props.onClick}>
      <h2>
        {deviceEmoji} {props.device.friendly_name}
      </h2>
      <p>{deviceDescription(deviceDefinition)}</p>
    </Card>
  );
}

export default DeviceCard;
