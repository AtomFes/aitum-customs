import { ICCActionInputs, ICustomCode } from 'aitum.js/lib/interfaces';
import { BooleanInput, IntInput, StringInput } from 'aitum.js/lib/inputs';
import { AitumCC } from 'aitum.js';
import { DeviceType } from 'aitum.js/lib/enums';
import axios from 'axios';

/*********** CONFIG ***********/
// The custom code action name
const name: string = 'WLED Strip Control';

// The custom code inputs
const inputs: ICCActionInputs = {
  deviceIp: new StringInput('WLED Device IP Address', { required: true }),
  presetId: new IntInput('Preset ID', { required: false }),
  devicePower: new BooleanInput('Power WLED Device On/Off', { required: false }),
  deviceBrightness: new IntInput('Set Brightness (0-255)', { required: false, minValue: 0, maxValue: 255 })
};

// Send request to WLED API
async function controlLED(wledIp: string, data: object) {
  const WLED_API_URL = `http://${wledIp}/json/state`;

  try {
    const response = await axios.post(WLED_API_URL, data);
    console.log('WLED is controlled', response.data);
  } catch (error) {
    console.error('WLED is not controlled:', error);
  }
}

// The code executed.
async function method(inputs: { [key: string]: number | string | boolean | string[] }) {

  // Get Aitum Library and Device
  const lib = AitumCC.get().getAitumJS();
  const aitumDevice = (await lib.getDevices(DeviceType.AITUM))[0];

// Call inputs
  const wledIp = inputs['deviceIp'] as string;

  if (!wledIp) {
    console.error('You need an IP to continue!');
    return;
  }

  const power = inputs['devicePower'] as boolean;
  const preset = inputs['presetId'] as number;
  const brightness = (inputs['deviceBrightness'] as number) || 255;

// Verify IP format
  const ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (!ipPattern.test(wledIp)) {
    console.error('Invalid IP address format.');
    return;
  }

// Control WLED Strip
  const ledData = {
    ps: preset,
    on: power,
    bri: brightness
  };

  await controlLED(wledIp, ledData);
}

/*********** DON'T EDIT BELOW ***********/
export default { name, inputs, method } as ICustomCode;
