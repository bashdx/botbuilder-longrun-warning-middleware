const { Bot } = require('botbuilder');
const { BotFrameworkAdapter } = require('botbuilder-services');
const restify = require('restify');
const warning = require('botbuilder-timeoutwarning-middleware');

// Create server
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log(`${server.name} listening to ${server.url}`);
});

// Create adapter and listen to servers '/api/messages' route.
const adapter = new BotFrameworkAdapter({ 
    appId: process.env.MICROSOFT_APP_ID, 
    appPassword: process.env.MICROSOFT_APP_PASSWORD 
});
server.post('/api/messages', adapter.listen());

// Initialize bot by passing it adapter
const bot = new Bot(adapter);

//add middleware, define callback for timeout and optional threshold value
bot.use(warning((context) => { console.log("timeout!"); }));

// Define the bots onReceive message handler
bot.onReceive((context) => {
    console.log("Received message");
    if (context.request.type === 'message') {
            //test using promise
            return new Promise(
                (resolve, reject) => {
                     setTimeout(() => resolve() , 15000);
                });
        }
});
