require('dotenv').config(); // 👈 must be the first line, before anything else

const express = require('express');
const bodyParser = require('body-parser');
const { WebPubSubServiceClient } = require('@azure/web-pubsub');
require('dotenv').config();

const app = express();
const port = 8080;

const hubName = 'main_hub';
const endpoint = process.env.WEB_PUBSUB_CONNECTION_STRING;

if (!endpoint) {
  console.error('❌ Set WEB_PUBSUB_CONNECTION_STRING in environment variables.');
  process.exit(1);
}

const serviceClient = new WebPubSubServiceClient(endpoint, hubName);

app.use(bodyParser.json());

app.get('/negotiate', async (req, res) => {
  const token = await serviceClient.getClientAccessToken();
  res.json({ url: token.url });
});

app.post('/publish', async (req, res) => {
  const { type = 'broadcast', group, message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const jsonData = typeof message === 'object' ? message : { text: message };

  if (type === 'group' && group) {
    await serviceClient.group(group).sendToAll(JSON.stringify(jsonData));
  } else {
    await serviceClient.sendToAll(JSON.stringify(jsonData));
  }

  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`✅ Node.js WebPubSub helper listening at http://localhost:${port}`);
});
