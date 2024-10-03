import { ICCActionInputs, ICustomCode } from 'aitum.js/lib/interfaces';
import { StringInput, BooleanInput, IntInput, FloatInput } from 'aitum.js/lib/inputs'; 
import axios from 'axios';

/*********** CONFIG ***********/
// The custom code action name
const name: string = 'Stream Reminder Log';

// The custom code inputs
const inputs: ICCActionInputs = {
  webhookUrl: new StringInput('Discord Webhook URL', { required: true }),
  broadcastUser: new StringInput('Your Twitch Username', { required: true }),
  user: new StringInput('User Creating Reminder', { required: true }),
  rawInput: new StringInput('Reminder Message', { required: false }),
};

// The code executed
async function method(inputs: { [key: string]: number | string | boolean | string[] }) {
  const webhookUrl = inputs['webhookUrl'] as string;
  const broadcastUser = inputs['broadcastUser'] as string;
  let rawInput = inputs['rawInput'] as string;
  const user = inputs['user'] as string;

  // Remove the first argument e.g. !reminder
  const inputParts = rawInput.split(' ');
  if (inputParts.length > 1) {
    rawInput = inputParts.slice(1).join(' ');
  } else {
    rawInput = '';
  }

  // Format content for Discord
  let content: string = '```';
  content += `\n${whenTheThingHappened()}: Reminder created by ${user}`;
  content += `\n${rawInput}`;
  content += '\n```';
  content += await getLatestVOD(broadcastUser);

  // Twitch avatar for Discord
  const avatarURL = 'https://i.imgur.com/xGoEvn9.png';

  // Post to Discord Webhook
  await postToDiscord(webhookUrl, content, user, avatarURL);
}

// Function to post to Discord Webhook
async function postToDiscord(webhookUrl: string, content: string, username: string, avatarUrl: string) {
  try {
    await axios.post(webhookUrl, {
      content: content,
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
