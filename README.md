# Aitum Customs

## What is Aitum Customs?
Inside this repository will be actions that can be used within Aitum's custom code. Download any of the actions here and add them to your `src/actions` folder.

## Support
Join the [Aitum Discord](https://aitum.tv/discord) and head over to `#cc-releases` and find the post labeled with the action in question and @ AtomFes for assistance.

##### *Note: You need to have already installed Aitum's custom code which can be found [here](https://github.com/Aitum/aitum-cc).*

## Actions
### WLEDStripControl.ts
After specifying your WLED device IP address, this action will allow you to control the light strip's preset, power, and brightness.

#### Available Inputs:

##### Required
- WLED Device IP Address
    - Example: 192.168.1.1

##### Optional
- Preset ID
    - Use a preset that you made.
- Power WLED Device On/Off
    - Allows the WLED to be turned on and off.
- Set Brighness (0-255)
    - Set the brightness of the WLED.
### StreamChatLog.ts
Log your Twitch or YouTube stream chat to a channel in your Discord. In order for this to work, you must have one of the following triggers:
- Device > Twitch
- Trigger Type > Chat Message

OR

- Device > YouTube
- Trigger type > Chat Message Added

#### Available Inputs:

##### Required
- Discord Webhook URL
    - Create a webhook in your Discord server with this guide [here](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks).

##### Optional

##### Twitch
- Activate Twitch Logging
    - Turn on Discord logging for your Twitch stream.
- Twitch Username
    - Variables > Twitch: Username
- Twitch Chat Message
    - Variables > Twitch: Message

##### YouTube
- Activate YouTube Logging
    - Turn on Discord logging for your YouTube stream.
- YouTube Username
    - Variables > YouTube: Username
- YouTube Chat Message
    - Variables > YouTube: Chat Message
- YouTube User ID
    - Variables > YouTube Channel ID
- YouTube User Profile ID
    - YouTube: User Channel URL