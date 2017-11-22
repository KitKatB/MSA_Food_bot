var builder = require('botbuilder');
// Some sections have been omitted

exports.startDialog = function (bot) {
     // Replace {YOUR_APP_ID_HERE} and {YOUR_KEY_HERE} with your LUIS app ID and your LUIS key, respectively.
     var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/8e05e034-b195-4c8e-8d0a-f39dfc8fb7ce?subscription-key=d836918e94e54da7adcadbed9185086a&verbose=true&timezoneOffset=0&q= ');
    
     bot.recognizer(recognizer);
     
         bot.dialog('GetCalories', function (session, args) {
             session.send("GetCalories Detected")
         }).triggerAction({matches: 'GetCalories'});

         bot.dialog('GetFavouriteFood', function (session, args) {
            session.send("GetFavourtieFood Detected")
        }).triggerAction({matches: 'GetFavouriteFood'});
        
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