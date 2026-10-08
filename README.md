# msg_webhook

Simple Discord bot that forwards new guild messages to a webhook URL.

## How it works

- Listens for the `MessageCreate` event (`index.js:52`).
- Ignores messages from bots.
- POSTs the message payload as JSON to `WEBHOOK_URL` via `sendWebhook` (`index.js:26`).
- Exits early if `TOKEN` or `WEBHOOK_URL` is missing, and reports webhook / login failures to the console.

## Requirements

- Node.js 18+ (uses global `fetch` and `discord.js` v14)
- A Discord bot token with the **Message Content** privileged intent enabled
- A webhook URL to receive forwarded messages

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file (never commit it):

   ```env
   TOKEN=your-discord-bot-token
   WEBHOOK_URL=https://example.com/webhook
   ```

3. Run the bot:

   ```bash
   node index.js
   ```

On successful login you should see:

```text
Logged in as YourBot#1234
```

## Notes

- `.env`, `node_modules/`, and local `*.test.js` files are ignored via `.gitignore`.
- Enable **Message Content Intent** in Discord Developer Portal → Bot → Privileged Gateway Intents, otherwise `message.content` will be empty.
