## Simple Websocket Server

A simple Express server to forward POST data from a webhook to websocket clients. This was built to forward Bitbucket webhook data to the [build-status-lights](https://github.com/astone123/build-status-lights.git) client.

### Environment

- `CERTIFICATE_PATH`
  - The path to your SSL certificate
- `PRIVATE_KEY_PATH`
  - The path to your private key
- `API_KEY`
  - An API key for your websocket client to use to connect to the server

### Getting Started

Make sure the environment variables above are set and then run

```
npm i && npm start
```

Point your webhooks to this server so that it can forward data on to your websocket clients.
