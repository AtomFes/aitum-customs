import { ICCActionInputs, ICustomCode } from 'aitum.js/lib/interfaces';
import { BooleanInput, FloatInput, IntInput, StringInput } from 'aitum.js/lib/inputs';
import { AitumCC } from 'aitum.js';
import { DeviceType } from 'aitum.js/lib/enums';
import axios from 'axios';

/*********** CONFIG ***********/
// The custom code action name
const name: string = 'WLED Strip Control';

// The custom code inputs
const inputs: ICCActionInputs = {
  deviceIp: new StringInput('IP of WLED Device', { required: false }),
  devicePower: new BooleanInput('Turn On/Off', { required: false }),
  deviceBrightness: new IntInput('Set Brightness (0-255)', { required: false, minValue: 0, maxValue: 255 }),
  rInput: new IntInput('Red Value (0-255)', { required: false, minValue: 0, maxValue: 255 }),
  gInput: new IntInput('Green Value (0-255)', { required: false, minValue: 0, maxValue: 255 }),
  bInput: new IntInput('Blue Value (0-255)', { required: false, minValue: 0, maxValue: 255 })

}

// Send request to WLED API
async function controlLED(wledIp: string, data: object) {
  const WLED_API_URL = 'http://${deviceIp}/json/state';
  
  try {

    const response = await axios.post(WLED_API_URL, data);
    console.log('WLED is controlled');

  } catch (error){

    console.error('WLED is not controlled:', error);

  }
}

// The code executed.
async function method(inputs: { [key: string]: number | string | boolean | string[] }) {

// Call all inputs
  const wledIp = inputs['deviceIP'] as string;

  if (!wledIp) {
    console.error('You need an IP to continue!');
    return;
  }

  const power = inputs['devicePower'] as boolean;
  const brightness = inputs['deviceBrightness'] as number || 255;
  const red = inputs['rInput'] as number;
  const green = inputs['gInput'] as number;
  const blue = inputs['bInput'] as number;

// Control WLED Strip
  const wledStrip = {
    on: power,
    bri: brightness,
    seg: [{
      col: [[red, green, blue]]
    }]
  }

  await controlLED(wledIp, wledStrip);
  
// Get Aitum Library and Device
  const lib = AitumCC.get().getAitumJS();
  const aitumDevice = (await lib.getDevices(DeviceType.AITUM))[0];

}

/*********** DON'T EDIT BELOW ***********/
export default { name, inputs, method } as ICustomCode;