# Twilio-Test

## Helpful Links
* [How to test webhooks locally with ngrok](https://www.youtube.com/watch?v=S1uExj7mMgM&list=PLqrz4nXepkz5sdhaee8F5HXoLqp_ZiVn6&index=6)
* [Click To Call Nodejs, Github](https://github.com/TwilioDevEd/clicktocall-node/tree/master)
* [Click To Call with Node.js and Express, Twilio](https://www.twilio.com/docs/voice/tutorials/click-to-call-node-express)
* [Click To Call, Stack Overflow](https://stackoverflow.com/questions/20454682/twilio-initiate-outbound-call-that-connects-agent-phone-before-dialing-target-nu)

## Testing Locally with Twilio
* Need to use `ngrok` in order to supply a secure https connection with twilio
* Bootstrap your express server on port 3000
* Open another terminal and run `ngrok http 3000`
* Open the https link provided by ngrok in your browser and tack on any endpoints your express app uses.
* Run `killall -9 node` when finished

# How is Twilio connecting 2 calls?
* In order to connect 2 phones we need a twilio phone number to act as a middle man, so that personal phone numbers are not exposed.
* This requires 2 API endpoints on our express server.
* The first endpoint calls the customer, if they answer, a webhook is triggered calling our second endpoint with the number to connect to in the response.
* The second endpoint contains the voice message and number to dial if the user listens till the end. 

the second endpoint privides  an optional message, if they answer or listen to the whole message a webhook will be triggered 