import { ICCActionInputs, ICustomCode } from 'aitum.js/lib/interfaces';
import { StringInput } from 'aitum.js/lib/inputs';
import axios from 'axios';

/*********** CONFIG ***********/
// The custom code action name
const name: string = 'Stream Event Log';

// The custom code inputs
const eventSources = ['TwitchFollow', 'TwitchSub'];

const inputs: ICCActionInputs = {
  webhookUrl: new StringInput('Discord Webhook URL', { required: true }),
  discordDisplayName: new StringInput('Discord Display Name', { required: true }),
  broadcastUser: new StringInput('Your Twitch Username', { required: true }),
  source: new StringInput(`Event Source (choose one: ${eventSources.join(', ')})`, { required: true }),
  user: new StringInput('User e.g., {TWITCH:username}:', { required: true })
}

// The code executed
async function method(inputs: { [key: string]: number | string | boolean | string[] }) {
  const webhookUrl = inputs['webhookUrl'] as string;
  const discordDisplayName = inputs['discordDisplayName'] as string;
  const broadcastUser = inputs['broadcastUser'] as string;
  const source = inputs['source'] as string;
  const user = inputs['user'] as string;

  const twitchAvatarURL = "https://i.imgur.com/xGoEvn9.png";

  // Throw error for invalid event source
  if (!eventSources.includes(source)) {
    throw new Error(`"${source}" is not a valid event source. Please choose one of the following: ${eventSources.join(', ')}`);
  }

  // Format content for Discord
  switch (source) {
    case 'TwitchChannelPointRedemption': {
      let content = '```';
      content += `\n${whenTheThingHappened()}: New Twitch Sub`;
      content += `\n'${user}' has subbed!`;
      content += '\n```';
      content += await getLatestVOD(broadcastUser);
      
      await postToDiscord(webhookUrl, content, discordDisplayName, twitchAvatarURL);
      break;
    }
    case 'TwitchFollow': {
      let content = '```';
      content += `\n${whenTheThingHappened()}: New Twitch Follow`;
      content += `\n'${user}' has followed!`;
      content += '\n```';
      content += await getLatestVOD(broadcastUser);

      await postToDiscord(webhookUrl, content, discordDisplayName, twitchAvatarURL);
      break;
    }
    case 'TwitchSub': {
      let content = '```';
      content += `\n${whenTheThingHappened()}: New Twitch Sub`;
      content += `\n'${user}' has subbed!`;
      content += '\n```';
      content += await getLatestVOD(broadcastUser);

      await postToDiscord(webhookUrl, content, discordDisplayName, twitchAvatarURL);
      break;
    }
    case 'TwitchGiftSub': {
      let content = '```';
      content += `\n${whenTheThingHappened()}: New Twitch Gift Sub`;
      content += `\n'${user}' has gifted a sub!`;
      content += '\n```';
      content += await getLatestVOD(broadcastUser);

      await postToDiscord(webhookUrl, content, discordDisplayName, twitchAvatarURL);
      break;
    }
    case 'TwitchCheer': {
      let content = '```';
      content += `\n${whenTheThingHappened()}: New Twitch Cheer`;
      content += `\n'${user}' has cheered bits!`;
      content += '\n```';
      content += await getLatestVOD(broadcastUser);

      await postToDiscord(webhookUrl, content, discordDisplayName, twitchAvatarURL);
      break;
    }
    case 'TwitchHypeTrainStarted': {
      let content = '```';
      content += `\n${whenTheThingHappened()}: Twitch Hype Train Started`;
      content += `\n'${user}' started a hype train!`;
      content += '\n```';
      content += await getLatestVOD(broadcastUser);

      await postToDiscord(webhookUrl, content, discordDisplayName, twitchAvatarURL);
      break;
    }
    case 'TwitchHypeTrainProgress': {
      let content = '```';
      content += `\n${whenTheThingHappened()}: Twitch Hype Train Progress`;
      content += `\nHype train continues! '${user}'`;
      content += '\n```';
      content += await getLatestVOD(broadcastUser);

      await postToDiscord(webhookUrl, content, discordDisplayName, twitchAvatarURL);
      break;
    }
    case 'TwitchHypeTrainEnded': {
      let content = '```';
      content += `\n${whenTheThingHappened()}: Twitch Hype Train Has Ended`;
      content += `\nHype train comes to an end! '${user}'`;
      content += '\n```';
      content += await getLatestVOD(broadcastUser);

      await postToDiscord(webhookUrl, content, discordDisplayName, twitchAvatarURL);
      break;
    }
    case 'TwitchHypeTrainLevelUp': {
      let content = '```';
      content += `\n${whenTheThingHappened()}: Twitch Hype Train Level Up`;
      content += `\nHype train has gone up a level! '${user}'`;
      content += '\n```';
      content += await getLatestVOD(broadcastUser);

      await postToDiscord(webhookUrl, content, discordDisplayName, twitchAvatarURL);
      break;
    }
    case 'TwitchPollStarted': {
      let content = '```';
      content += `\n${whenTheThingHappened()}: Twitch Poll Started`;
      content += `\n'${user}' started a poll!`;
      content += '\n```';
      content += await getLatestVOD(broadcastUser);

      await postToDiscord(webhookUrl, content, discordDisplayName, twitchAvatarURL);
      break;
    }
    case 'TwitchPollEnded': {
      let content = '```';
      content += `\n${whenTheThingHappened()}: Twitch Poll Ended`;
      content += `\nPoll has ended! '${user}'`;
      content += '\n```';
      content += await getLatestVOD(broadcastUser);

      await postToDiscord(webhookUrl, content, discordDisplayName, twitchAvatarURL);
      break;
    }
    case 'TwitchPredictionStarted': {
      let content = '```';
      content += `\n${whenTheThingHappened()}: Twitch Prediction Started`;
      content += `\n'${user}' started a prediction!`;
      content += '\n```';
      content += await getLatestVOD(broadcastUser);

      await postToDiscord(webhookUrl, content, discordDisplayName, twitchAvatarURL);
      break;
    }
    case 'TwitchPredictionEnded': {
      let content = '```';
      content += `\n${whenTheThingHappened()}: Twitch Prediction Ended`;
      content += `\nPrediction has ended! '${user}'`;
      content += '\n```';
      content += await getLatestVOD(broadcastUser);

      await postToDiscord(webhookUrl, content, discordDisplayName, twitchAvatarURL);
      break;
    }
    case 'TwitchIncomingRaid': {
      let content = '```';
      content += `\n${whenTheThingHappened()}: Twitch Raid`;
      content += `\n'${user}' is raiding!`;
      content += '\n```';
      content += await getLatestVOD(broadcastUser);

      await postToDiscord(webhookUrl, content, discordDisplayName, twitchAvatarURL);
      break;
    }
    case 'TwitchAdStarted': {
      let content = '```';
      content += `\n${whenTheThingHappened()}: Twitch Ad Started`;
      content += `\n'${user}' started an ad!`;
      content += '\n```';
      content += await getLatestVOD(broadcastUser);

      await postToDiscord(webhookUrl, content, discordDisplayName, twitchAvatarURL);
      break;
    }
    case 'TwitchAdEnded': {
      let content = '```';
      content += `\n${whenTheThingHappened()}: Twitch Ad Ended`;
      content += `\nAn ad has ended! '${user}'`;
      content += '\n```';
      content += await getLatestVOD(broadcastUser);

      await postToDiscord(webhookUrl, content, discordDisplayName, twitchAvatarURL);
      break;
    }
    case 'TwitchCategoryChange': {
      let content = '```';
      content += `\n${whenTheThingHappened()}: Twitch Category Updated`;
      content += `\n'${user}' changed the category.`;
      content += '\n```';
      content += await getLatestVOD(broadcastUser);

      await postToDiscord(webhookUrl, content, discordDisplayName, twitchAvatarURL);
      break;
    }
    case 'TwitchShieldModeChanged': {
      let content = '```';
      content += `\n${whenTheThingHappened()}: Twitch Shield Mode Changed`;
      content += `\n'${user}' changed the shield mode.`;
      content += '\n```';
      content += await getLatestVOD(broadcastUser);

      await postToDiscord(webhookUrl, content, discordDisplayName, twitchAvatarURL);
      break;
    }
    case 'TwitchShoutoutSent': {
      let content = '```';
      content += `\n${whenTheThingHappened()}: Twitch Shoutout Sent`;
      content += `\n'${user}' sent a shoutout!`;
      content += '\n```';
      content += await getLatestVOD(broadcastUser);

      await postToDiscord(webhookUrl, content, discordDisplayName, twitchAvatarURL);
      break;
    }
    case 'TwitchShoutoutReceived': {
      let content = '```';
      content += `\n${whenTheThingHappened()}: Twitch Shoutout Received`;
      content += `\nWe received a shoutout from '${user}'!`;
      content += '\n```';
      content += await getLatestVOD(broadcastUser);

      await postToDiscord(webhookUrl, content, discordDisplayName, twitchAvatarURL);
      break;
    }
    default:
      console.log(`Unhandled source: ${source}`);
  }
}

// Function to post to Discord Webhook
async function postToDiscord(webhookUrl: string, content: string, username: string, avatarUrl: string) {
  try {
    await axios.post(webhookUrl, {
      content: content,
      username: username,
      avatar_url: avatarUrl
    });
    console.log('Message posted to Discord');
  } catch (error) {
    console.error('Error posting to Discord:', error);
  }
}

// Latest Twitch VOD with timecode
async function getLatestVOD(broadcastUser: string): Promise<string> {
  let latestVOD = '';

  try {
    const vodResponse = await axios.get(`https://decapi.me/twitch/videos/${broadcastUser}`);
    latestVOD = vodResponse.data;

    const linkMatch = latestVOD.match(/\b(?:https?:\/\/|www\.)\S+\b/);
    if (!linkMatch) {
      console.error('No VOD link found.');
      return 'No VOD link available.';
    }
    latestVOD = linkMatch[0];

    const uptimeResponse = await axios.get(`https://decapi.me/twitch/uptime/${broadcastUser}`);
    const uptime: string = uptimeResponse.data;

    // Is stream offline?
    if (uptime.includes('offline')) {
      console.warn('Stream is offline, no VOD timecode will be added.');
      return latestVOD;
    }

    // Split uptime
    const timeParts = uptime.split(', ').map(part => {
      const value = parseInt(part.split(' ')[0]);
      if (part.includes('day')) return value * 86400;
      if (part.includes('hour')) return value * 3600;
      if (part.includes('minute')) return value * 60;
      if (part.includes('second')) return value;
      return 0;
    });

    const totalSeconds = timeParts.reduce((a, b) => a + b, 0);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Format time as HHhMMmSSs for VOD
    const hmsFormat = `${hours.toString().padStart(2, '0')}h${minutes.toString().padStart(2, '0')}m${seconds.toString().padStart(2, '0')}s`;

    // Return the VOD link and timecode
    return `<${latestVOD}?t=${hmsFormat}>`;
  } catch (error) {
    console.error('Error fetching VOD or uptime:', error);
    return 'Error fetching VOD or uptime.';
  }
}

// Format date and time
function whenTheThingHappened(): string {
  const now = new Date();
  return `[${now.getFullYear()}-${('0' + (now.getMonth() + 1)).slice(-2)}-${('0' + now.getDate()).slice(-2)} ${('0' + now.getHours()).slice(-2)}:${('0' + now.getMinutes()).slice(-2)}:${('0' + now.getSeconds()).slice(-2)}]`;
}

/*********** DON'T EDIT BELOW ***********/
export default { name, inputs, method } as ICustomCode;
