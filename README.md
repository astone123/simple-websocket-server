## Simple Websocket Server

A simple Express server to forward POST data from a webhook to websocket clients.

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
