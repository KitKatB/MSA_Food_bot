var restify = require('restify');
var builder = require('botbuilder');
var luis = require('./controller/LuisDialog');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: "9c75bd3a-c0fb-4d3a-9ee0-66509846785c",
    appPassword: "afX86!~{iuhuzGYKRGJ551;"
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());


// Receive messages from the user
var bot = new builder.UniversalBot(connector, function (session) {
    
        session.send('Sorry, I did not understand \'%s\'. Type \'help\' if you need assistance.', session.message.text);
    });
    
// This line will call the function in your LuisDialog.js file
//pass bot as argument into the LuisDialog
//bot is a UniversalBot from botbuilder
luis.startDialog(bot);