// SPDX-License-Identifier: GPL-3.0-or-later

import mqtt from 'mqtt/dist/mqtt';
let client;

let oneTimeTopicCallbacks = {};
let devices;

const mqttPort = 1884;
const hostname = window.location.hostname;
const mqttEndpoint =
  process.env.REACT_APP_MQTT_ENDPOINT || `mqtt://${hostname}:${mqttPort}`;

export const init = (options, bridgeInfoOnChange) => {
  client = mqtt.connect(mqttEndpoint, options);

  if (!client.connected) {
    client.on('message', (topic, payload) => {
      const messageContent = JSON.parse(payload.toString());
      switch (topic) {
        case 'zigbee2mqtt/bridge/info':
          if (bridgeInfoOnChange) bridgeInfoOnChange(messageContent);
          break;
        case 'zigbee2mqtt/bridge/devices':
          devices = messageContent;
          break;
        default:
          break;
      }

      if (
        oneTimeTopicCallbacks[topic] &&
        oneTimeTopicCallbacks[topic].length > 0
      ) {
        let callback = oneTimeTopicCallbacks[topic].shift();
        callback(payload);
      }
    });

    client.once('connect', () => {
      client.subscribe('zigbee2mqtt/bridge/devices');
      client.subscribe('zigbee2mqtt/bridge/info');
    });
  }
};

export const getDevices = () => {
  let topic = 'zigbee2mqtt/bridge/devices';

  return new Promise((resolve) => {
    if (devices !== undefined) resolve(devices);

    if (!oneTimeTopicCallbacks[topic]) oneTimeTopicCallbacks[topic] = [];
    const callbackFunction = (payload) => {
      resolve(JSON.parse(payload.toString()));
    };

    oneTimeTopicCallbacks[topic].push(callbackFunction);
  });
};

export const getDeviceSettings = (deviceFriendlyName, properties) => {
  return new Promise((resolve) => {
    const topic = `zigbee2mqtt/${deviceFriendlyName}`;

    client.subscribe(topic);

    if (!oneTimeTopicCallbacks[topic]) oneTimeTopicCallbacks[topic] = [];
    const callbackFunction = (payload) => {
      resolve(JSON.parse(payload.toString()));
    };

    oneTimeTopicCallbacks[topic].push(callbackFunction);

    sendMqttMessage(`${topic}/get`, properties);
  });
};

export const setDeviceSettings = (deviceFriendlyName, settings) => {
  const topic = `zigbee2mqtt/${deviceFriendlyName}`;
  sendMqttMessage(`${topic}/set`, settings);
};

export const setDeviceFriendlyName = (deviceFriendlyName, newFriendlyName) => {
  const topic = 'zigbee2mqtt/bridge/request/device/rename';
  const message = {
    from: deviceFriendlyName,
    to: newFriendlyName,
  };

  sendMqttMessage(topic, message);
};

export const sendMqttMessage = (topic, message) => {
  client.publish(topic, JSON.stringify(message));
};

export const checkForDeviceUpdate = (deviceFriendlyName) => {
  return new Promise((resolve) => {
    const deviceTopic = `zigbee2mqtt/${deviceFriendlyName}`;
    const topic = 'zigbee2mqtt/bridge/request/device/ota_update/check';
    const message = {
      id: deviceFriendlyName,
    };

    client.subscribe(deviceTopic);

    if (!oneTimeTopicCallbacks[deviceTopic])
      oneTimeTopicCallbacks[deviceTopic] = [];
    const callbackFunction = (payload) => {
      resolve(JSON.parse(payload.toString()));
    };

    oneTimeTopicCallbacks[deviceTopic].push(callbackFunction);

    sendMqttMessage(topic, message);
  });
};
