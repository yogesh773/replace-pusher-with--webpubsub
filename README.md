# Azure WebPubSub Realtime Demo

This project demonstrates how to implement real-time messaging using **Azure Web PubSub**, with a **Laravel backend**, a **Node.js helper server**, and a basic **frontend client** (React or plain HTML).

---

## 🧱 Project Structure

```

├── demo_laravel/                 # Laravel app
│   ├── app/Services/WebPubSubPublisher.php
│   ├── routes/web.php
│   ├── .env
│   └── config/services.php

├── webpubsub-helper/            # Node.js PubSub helper server
│   ├── server.js
│   ├── .env
│   ├── package.json

├── resources/js/components/     # React component (optional)
│   └── Realtime.jsx

└── webpubsub-test.html          # Basic HTML client for testing (optional)

````

---

## ⚙️ Setup Instructions

### 1. Clone the repo and install dependencies

```bash
git clone https://github.com/your-username/webpubsub-realtime-demo.git
cd webpubsub-realtime-demo
````

---

### 2. Configure Laravel

In `demo_laravel/.env`, add:

```
WEBPUBSUB_HELPER_URL=http://127.0.0.1:8080
WEBPUBSUB_DEFAULT_TYPE=broadcast
WEBPUBSUB_GROUP=group1
```

In `config/services.php`, add:

```php
'webpubsub' => [
    'node_url' => env('WEBPUBSUB_HELPER_URL', 'http://127.0.0.1:8080'),
],
```

Then run Laravel:

```bash
cd demo_laravel
php artisan serve
```

This runs Laravel at: `http://127.0.0.1:8000`

---

### 3. Setup Node.js WebPubSub Helper

In `webpubsub-helper/.env`:

```
WEB_PUBSUB_CONNECTION_STRING=Endpoint=...;AccessKey=...;Version=1.0;
HUB_NAME=main_hub
```

Install and run:

```bash
cd webpubsub-helper
npm install
node -r dotenv/config server.js
```

It will start on: `http://127.0.0.1:8080`

---

### 4. Test Realtime from Laravel

Visit:

```
http://127.0.0.1:8000/test-push
```

This sends a message from Laravel → Node → Azure WebPubSub → Frontend

---

### 5. Frontend Testing Options

#### ✅ Option A: React (resources/js/components/Realtime.jsx)

Ensure React is compiled and mounted properly.

#### ✅ Option B: Basic HTML (webpubsub-test.html)

Just open this file in your browser. It will show real-time messages coming from Laravel.

---

## ✅ Features

* Laravel backend triggers WebPubSub messages
* Node.js helper signs negotiation & publishes to Azure
* Frontend connects using WebSockets and receives data

---

## 📦 Tech Stack

* Laravel (PHP)
* Node.js + Express
* Azure Web PubSub
* React (optional) / plain HTML

---

## 📄 License

MIT – free to use and modify.

```

---

Let me know if you want this saved as a file or committed directly into a Git repo.
```
