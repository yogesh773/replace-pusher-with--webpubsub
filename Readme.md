## ☁️ Azure Web PubSub Setup Guide

This document explains how to create and configure **Azure Web PubSub** service to integrate with your backend and frontend apps.

---

### 🛠️ 1. Create Azure Web PubSub Instance

1. Go to the [Azure Portal](https://portal.azure.com).

2. Click on **"Create a resource"** > Search for **"Web PubSub"**.

3. Select **"Web PubSub"** and click **"Create"**.

4. Fill in the required fields:

   * **Subscription**: Your Azure subscription
   * **Resource Group**: Create new or use existing
   * **Name**: e.g. `my-webpubsub`
   * **Pricing Tier**: Free F1 is okay for dev/test
   * **Region**: Choose closest to your users

5. Click **Review + Create** → then **Create**.

---

### 🔑 2. Get the Connection String

1. Once deployment is done, go to your Web PubSub resource.
2. In the left sidebar, click **"Keys"**.
3. Copy the **Connection String** (under Primary key).

---

### 🧾 3. Add to `.env` File

In your **Node.js helper** project (e.g. `webpubsub-helper/.env`):

```env
WEB_PUBSUB_CONNECTION_STRING=Endpoint=https://<your-resource-name>.webpubsub.azure.com;AccessKey=your-key;Version=1.0;
HUB_NAME=main_hub
PORT=8080
```

---

### 🚦 4. Define Hub Rules (Optional)

You can configure permissions per hub/group in Azure:

* In the Azure Portal > your Web PubSub resource
* Go to **"Settings" > "Client Connections"**
* Set allowed roles (e.g., `webpubsub.sendToGroup`, `webpubsub.joinLeaveGroup`)

---

### 🧪 5. Test With Your App

Once the Azure service is running:

* The **Node.js helper** handles `/negotiate` and `/publish`
* The **Frontend (React or HTML)** connects to WebSocket using the URL from `/negotiate`
* The **Laravel** backend can send messages via POST to the Node helper, which relays it to Azure Web PubSub

---

### ✅ Done!

You're now ready to use Azure Web PubSub to broadcast real-time events from Laravel to frontend clients.

Let me know if you want a separate README combining Laravel + Azure + Node instructions into one unified guide.
