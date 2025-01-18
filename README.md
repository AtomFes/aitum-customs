# Aitum Customs

## What is Aitum Customs?
Inside this repository will be actions that can be used within Aitum's custom code. Download any of the actions here and add them to your `src/actions` folder.

## Support
Join the [Aitum Discord](https://aitum.tv/discord) and head over to `#cc-releases` and find the post labeled with the action in question and @ AtomFes for assistance.

##### *Note: You need to have already installed Aitum's custom code which can be found [here](https://github.com/Aitum/aitum-cc).*

## Actions

<details>
<summary>WLEDStripControl.ts</summary>
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
</details>

<details>
<summary>StreamChatLog.ts</summary>
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
</details>

<details>
    <summary>StreamEventLog.ts</summary>
Log your Twitch or YouTube stream events to a channel in your Discord. In order for this to work, you must have at least one even from Twitch or YouTube.

##### *Note: This action is for Twitch only. YouTube coming soon.*


#### Available Inputs:

##### Required
- Discord Webhook URL
    - Create a webhook in your Discord server with this guide [here](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks).
- Discord Display Name
    - This sets the display name for the "bot" in the channel you specify.
- Your Twitch Username
    - This is needed for your latest VOD so you can be taken to the exact moment you set received the event.
- Event Source (choose one: TwitchFollow, TwitchSub)
    - Pick one event source from the list below to log that specific event. Please note that it's a basic event log and does not show details of the chosen event.
    <details>
    <summary>Event Source List</summary>
    <ul>
    <li><strong>TwitchChannelPointRedemption</strong>: User redeems a channel point redemption.</li>
    <li><strong>TwitchFollow</strong>: User follows.</li>
    <li><strong>TwitchSub</strong>: User subs.</li>
    <li><strong>TwitchGiftSub</strong>: User gifts a sub(s).</li>
    <li><strong>TwitchCheer</strong>: User cheers bit(s).</li>
    <li><strong>TwitchHypeTrainStarted</strong>: Hype train started.</li>
    <li><strong>TwitchHypeTrainProgress</strong>: Hype train progress.</li>
    <li><strong>TwitchHypeTrainEnded</strong>: Hype train ended.</li>
    <li><strong>TwitchHypeTrainLevelUp</strong>: Hype train leveled up.</li>
    <li><strong>TwitchPollStarted</strong>: Poll started.</li>
    <li><strong>TwitchPollEnded</strong>: Poll ended.</li>
    <li><strong>TwitchPredictionStarted</strong>: Prediction started.</li>
    <li><strong>TwitchPredictionEnded</strong>: Prediction ended.</li>
    <li><strong>TwitchIncomingRaid</strong>: Raid incoming.</li>
    <li><strong>TwitchAdStarted</strong>: Ad starting.</li>
    <li><strong>TwitchAdEnded</strong>: Ad ending.</li>
    <li><strong>TwitchCategoryChanged</strong>: Category updated.</li>
    <li><strong>TwitchShieldModeChanged</strong>: Shield mode changed.</li>
    <li><strong>TwitchShoutoutSent</strong>: Shoutout sent to someone.</li>
    <li><strong>TwitchShoutoutReceived</strong>: Shoutout received from someone.</li>
  </ul>
- User e.g., {TWITCH:username}
    - This will show who triggered the event.
    </details>
</details>

<details>
<summary>StreamReminderLog.ts</summary>
Need to remind yourself to do something after a stream? Use this with the Twitch > Chat Message trigger to send you a reminder in Discord using a Webhook URL and a direct link to the time in stream of your reminder.

##### *Note: This action is for Twitch only.*

#### Available Inputs:

##### Required
- Discord Webhook URL
    - Create a webhook in your Discord server with this guide [here](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks).
- Your Twitch Username
    - This is needed for your latest VOD so you can be taken to the exact moment you set the reminder.
- User Creating Reminder
    - This helps remind you who sent the reminder incase you allow moderators to use this action.

##### Optional
- Reminder Message
    - This can be left blank unless you want a set message everytime you use this action.
</details>