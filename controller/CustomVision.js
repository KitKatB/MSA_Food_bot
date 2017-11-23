var request = require('request'); //node module for http post requests

exports.retreiveMessage = function (session){

    request.post({
        url: 'https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/0e2cae0e-9baa-40c7-80c3-edb37877ee55/url?iterationId=9134991e-996b-449b-8cc0-f03d9a24b951',
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Prediction-Key': '2dd2a9027fb54290b07cfe1f78c2544d'
        },
        body: { 'Url': session.message.text }
    }, function(error, response, body){
        console.log(validResponse(body));
        session.send(validResponse(body));
    });
};

function validResponse(body){
    if (body && body.Predictions && body.Predictions[0].Tag){
        return "This is " + body.Predictions[0].Tag
    } else{
        console.log('Oops, please try again!');
    }
}