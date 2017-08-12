import * as restify from 'restify';
import * as builder from 'botbuilder';
import * as os from 'os';

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
    session.send(`Kubernetes is awesome! I am ${os.hostname}. You said: ${session.message.text}`)
});
