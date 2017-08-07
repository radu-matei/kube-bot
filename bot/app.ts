import * as restify from 'restify';
import * as builder from 'botbuilder';

const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

const server = restify.createServer();
server.post('/api/messages', connector.listen());

server.listen(process.env.PORT, () => console.log(`${server.name} listening to ${server.url}`));
