var builder = require('botbuilder');
var food = require('./FavouriteFood');
// Some sections have been omitted

//LuisDialog's startDialog take in a bot as an argument
exports.startDialog = function (bot) {
     // Replace {YOUR_APP_ID_HERE} and {YOUR_KEY_HERE} with your LUIS app ID and your LUIS key, respectively.
        var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/8e05e034-b195-4c8e-8d0a-f39dfc8fb7ce?subscription-key=d836918e94e54da7adcadbed9185086a&verbose=true&timezoneOffset=0&q= ');
        
        //assigns the recieved bot's recognizer to the LUIS recognizer created above
        bot.recognizer(recognizer);
        
        //bot's assigned recognizer determines which dialog to use according to user's message

        bot.dialog('GetCalories', function (session, args) {
            session.send("GetCalories Detected")
        }).triggerAction({matches: 'GetCalories'});

        bot.dialog('GetFavouriteFood', [
            function (session, args, next) {
                session.dialogData.args = args || {};        
                if (!session.conversationData["username"]) {
                    builder.Prompts.text(session, "Enter a username to setup your account.");                
                } else {
                    next(); // Skip if we already have this info.
                }
            },
            function (session, results, next) {
                    if (results.response) {
                        session.conversationData["username"] = results.response;
                    }

                    session.send("Retrieving your favourite foods");
                    food.displayFavouriteFood(session, session.conversationData["username"]);  // <---- THIS LINE HERE IS WHAT WE NEED 
                
            }
        ]).triggerAction({
            matches: 'GetFavouriteFood'
        });
        
        bot.dialog('LookForFavourite', function (session, args) {
            session.send("LookForFavourite Detected")
        }).triggerAction({matches: 'LookForFavourite'});

        bot.dialog('WantFood', function (session, args) {
            session.send("WantFood Detected")
        }).triggerAction({matches: 'WantFood'});

        bot.dialog('DeleteFavourite', function (session, args) {
            session.send("DeleteFavourite Detected")
        }).triggerAction({matches: 'DeleteFavourite'});
    
        bot.dialog('WelcomeIntent', function (session, args) {
            session.send("WelcomeIntent Detected")
        }).triggerAction({matches: 'WelcomeIntent'});
     }