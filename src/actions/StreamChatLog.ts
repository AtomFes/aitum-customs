import { ICCActionInputs, ICustomCode } from 'aitum.js/lib/interfaces';
import { StringInput, BooleanInput } from 'aitum.js/lib/inputs';
import axios from 'axios';

/*********** CONFIG ***********/
// The custom code action name
const name: string = 'Stream Chat Log';

// The custom code inputs (Boolean for Twitch and YouTube, separate fields for each platform)
const inputs: ICCActionInputs = {
  webhookUrl: new StringInput('Discord Webhook URL', { required: true }),

  // Twitch fields
  isTwitch: new BooleanInput('Activate Twitch Logging', { required: false }),
  twitchUser: new StringInput('Twitch Username', { required: false }),
  twitchMessage: new StringInput('Twitch Chat Message', { required: false }),

  // YouTube fields
  isYouTube: new BooleanInput('Activate YouTube Logging', { required: false }),
  youtubeUser: new StringInput('YouTube Username', { required: false }),
  youtubeMessage: new StringInput('YouTube Chat Message', { required: false }),
  youtubeUserId: new StringInput('YouTube User ID', { required: false }),
  youtubeUserProfileUrl: new StringInput('YouTube User Profile URL', { required: false })
}

// The code executed
async function method(inputs: { [key: string]: string | boolean }) {
  const webhookUrl = inputs['webhookUrl'] as string;
  const isTwitch = inputs['isTwitch'] as boolean;
  const isYouTube = inputs['isYouTube'] as boolean;
  
  let errorMessage = '';
  let messagesToSend = 0;

  // Twitch message
  if (isTwitch) {
    const twitchMessage = inputs['twitchMessage'] as string;
    const twitchUser = inputs['twitchUser'] as string;

    if (!twitchMessage || !twitchUser) {
      errorMessage += 'Error: Twitch message and user name are required.\n';
    } else {
      await postTwitchChatMessage(webhookUrl, twitchMessage, twitchUser);
      messagesToSend++;
    }
  }

  // YouTube message
  if (isYouTube) {
    const youtubeMessage = inputs['youtubeMessage'] as string;
    const youtubeUser = inputs['youtubeUser'] as string;
    const youtubeUserId = inputs['youtubeUserId'] as string;
    const youtubeUserProfileUrl = inputs['youtubeUserProfileUrl'] as string;

    if (!youtubeMessage || !youtubeUser || !youtubeUserId || !youtubeUserProfileUrl) {
      errorMessage += 'Error: YouTube message, user name, user ID, and profile URL are required.\n';
    } else {
      await postYouTubeMessage(webhookUrl, youtubeMessage, youtubeUser, youtubeUserId, youtubeUserProfileUrl);
      messagesToSend++;
    }
  }

  // Send errors to Discord Webhook
  if (errorMessage) {
    await postToDiscord(webhookUrl, `\`\`\`\n${errorMessage}\n\`\`\``, 'Error Handler');
  }

  // Send error to Discord Webhook for missing message source
  if (messagesToSend === 0 && !errorMessage) {
    await postToDiscord(webhookUrl, `\`\`\`\nError: No valid message source selected.\n\`\`\``, 'Error Handler');
  }
}

// Log Twitch chat message
async function postTwitchChatMessage(webhookUrl: string, message: string, user: string) {
  const content = `\`\`\`
${whenTheThingHappened()}: ${user}
${message}
\`\`\``;

  const avatarURL = 'https://i.imgur.com/xGoEvn9.png'; // Placeholder for Twitch avatar URL

  await postToDiscord(webhookUrl, content, user, avatarURL);
}

// Log YouTube message
async function postYouTubeMessage(webhookUrl: string, message: string, user: string, userId: string, userProfileUrl: string) {
  const content = `\`\`\`
${whenTheThingHappened()}: ${user}
https://www.youtube.com/channel/${userId}
${message}
\`\`\``;

  await postToDiscord(webhookUrl, content, user, userProfileUrl);
}

// Function to post to Discord webhook
async function postToDiscord(webhookUrl: string, content: string, username: string, avatarUrl?: string) {
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

// Format date and time
function whenTheThingHappened(): string {
  const now = new Date();
  return `[${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}]`;
}

/*********** DON'T EDIT BELOW ***********/
export default { name, inputs, method } as ICustomCode;