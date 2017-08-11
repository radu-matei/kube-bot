import * as restify from 'restify';
import * as builder from 'botbuilder';

const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

const server = restify.createServer();
server.post('/api/messages', connector.listen());
server.get('/healthz', (request, response) => {
    response.send(200);
})

server.listen(3978, () => console.log(`${server.name} listening to ${server.url}`));

var bot = new builder.UniversalBot(connector, (session: builder.Session) => {
    session.send(`I think you said: ${session.message.text}`)
});
