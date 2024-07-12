# Aitum Customs

## What is Aitum Customs?
Inside this repository will be actions that can be used within Aitum's custom code. Download any of the actions here and add them to your `src/actions` folder.

In order to use these actions, please setup aitum-cc. Intructions for installing aitum-cc can be found [here](https://github.com/Aitum/aitum-cc).

## Actions
### WLEDStripControl.ts
After specifying your devices IP, the action will allow you to control the light strip's power, brightness, and color.

Available Inputs:

- IP of WLED Device
    - Example: 192.168.1.1
- Turn On/Off
    - Allows the WLED to be turned on and off.
- Set Brighness (0-255)
    - Set the brightness of the WLED.
- Red Value (0-255)
    - Raise or lower the amount of red within the WLED light.
- Green Value (0-255)
    - Raise or lower the amount of green within the WLED light.
- Blue Value (0-255)
    - Raise or lower the amount of blue within the WLED light.