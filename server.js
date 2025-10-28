require('dotenv').config(); // 👈 must be the first line, before anything else

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { WebPubSubServiceClient } = require('@azure/web-pubsub');


const app = express();
app.use(cors());
app.use(bodyParser.json());

const connStr = process.env.WEB_PUBSUB_CONNECTION_STRING;
const hubName = process.env.HUB_NAME || 'main_hub';
const port = process.env.PORT || 8080;

if (!connStr) {
  console.error('❌ Set WEB_PUBSUB_CONNECTION_STRING in environment variables.');
  process.exit(1);
}

const serviceClient = new WebPubSubServiceClient(connStr, hubName);

app.get('/negotiate', async (req, res) => {
  try {
    const token = await serviceClient.getClientAccessToken({
      roles: ['webpubsub.joinLeaveGroup', 'webpubsub.sendToGroup']
    });
    res.json({ url: token.url });
  } catch (err) {
    console.error('Negotiate error:', err);
    res.status(500).json({ error: 'negotiate failed' });
  }
});

app.post('/publish', async (req, res) => {
  try {
    const { type, group, message } = req.body;
    const data = typeof message === 'string' ? message : JSON.stringify(message || {});
    if (type === 'group' && group) {
      await serviceClient.sendToGroup(group, data, 'json');
      res.json({ ok: true, sentTo: `group:${group}` });
    } else {
      await serviceClient.sendToAll(data, 'json');
      res.json({ ok: true, sentTo: 'all' });
    }
  } catch (err) {
    console.error('Publish error:', err);
    res.status(500).json({ error: err.message || 'publish failed' });
  }
});

app.listen(port, () => {
  console.log(`✅ WebPubSub helper running on port ${port}`);
});
