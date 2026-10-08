require("dotenv").config();

const { Client, GatewayIntentBits, Events } = require("discord.js");

const TOKEN = process.env.TOKEN;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

if (!TOKEN) {
  console.error("Missing TOKEN");
  process.exit(1);
}

if (!WEBHOOK_URL) {
  console.error("Missing WEBHOOK_URL");
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const sendWebhook = async (url, payload) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const details = await response.text().catch(() => "");
      console.error(`Webhook failed: ${response.status} ${response.statusText} ${details}`);
      return;
    }

    console.log(`Forwarded message (${response.status})`);
  } catch (error) {
    console.error(`Webhook error: ${error.message}`);
  }
};

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author?.bot) return;

  await sendWebhook(WEBHOOK_URL, message);
});

client.login(TOKEN).catch((error) => {
  console.error(`Login failed: ${error.message}`);
  process.exit(1);
});
