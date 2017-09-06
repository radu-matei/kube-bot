import * as restify from 'restify';
import * as builder from 'botbuilder';
import * as os from 'os';
import * as http from 'http'

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
    session.send(`I am ${os.hostname}. You said: ${session.message.text}`)
});

var recognizer = new builder.LuisRecognizer(process.env.LUIS_URI);
bot.recognizer(recognizer);

bot.dialog('GetContainers', function (session) {
    session.say('You are trying to get containers.',
        'You are trying to get containers.');

}).triggerAction({
    matches: 'GetContainers'
});

bot.dialog('GetServices', function (session) {
    session.say('You are trying to get services.',
        'You are trying to get services.');
}).triggerAction({
    matches: 'GetServices'
});


bot.dialog('GetClusterInfo', function (session) {
    var options = {
        host: 'go-client',
        port: 80,
        path: '/get/cluster'
    };

    var body = 'I hope your demo fails! '
    http.get(options, response => {
        response.on('data', data => {
            body += data
        });
        response.on('end', ()=> {
            session.say(body, body)     
        })
    })
}).triggerAction({
    matches: 'GetClusterInfo'
});