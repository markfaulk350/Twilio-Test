import * as dotenv from 'dotenv'
dotenv.config()

const log = console.log

import twilio from 'twilio'
const VoiceResponse = twilio.twiml.VoiceResponse
import http from 'http'
import express from 'express'
const port = process.env.PORT || 3000

const app = express()

app.get('/', (req, res) => {
  res.json({message: 'OK'})
})

app.get('/call', async (req, res) => {
  try {
    const client = await twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    )

    client.calls.create(
      {
        // Mom then Mark
        // url: `http://${req.headers.host}/outbound/${encodeURIComponent('+17608460475')}`,
        // to: '+17603900964', // Mom
        // from: '+12058464907', // Twilio


        // Mark then Ryan
        // url: `http://${req.headers.host}/outbound/${encodeURIComponent('+16166359732')}`,
        // to: '+17608460475', // Mark
        // from: '+12058464907', // Twilio

        // Ryan then Mark
        url: `http://${req.headers.host}/outbound/${encodeURIComponent('+17608460475')}`,
        to: '+16166359732', // Ryan
        from: '+12058464907', // Twilio

      },
      (err, call) => {
        if (err) {
          log(err)
        } else {
          log(call)
          res.json(call)
        }
      },
    )
  } catch (err) {
    log(err)
  }
})

app.post('/outbound/:salesNumber', function(request, response) {
  var salesNumber = request.params.salesNumber;
  var twimlResponse = new VoiceResponse();

  twimlResponse.play({ loop: 1 }, 'https://raw.githubusercontent.com/markfaulk350/Twilio-Test/main/step_brothers.mp3')

  // twimlResponse.say({
  //   voice: 'alice'
  // }, `What does a robot do at the end of a one night stand?`);

  // twimlResponse.say({
  //   voice: 'man'
  // }, `What?`);

  // twimlResponse.say({
  //   voice: 'alice'
  // }, `He nuts and bolts. Ha Ha Ha Ha Ha Ha.`);

  // twimlResponse.say('Thanks for contacting our sales department. Our next available representative will take your call.');

  twimlResponse.say({
    voice: 'alice'
  }, `Hey Ryan it's Mark. This message would normally say something like thanks for contacting our loan department. Our next available representative will take your call. As you can already tell we can play mp3 audio files or have robots convert text to speech. This should automatically dial my cell phone number now. Wait a few seconds please.`);



  twimlResponse.dial(salesNumber);

  response.send(twimlResponse.toString());
});

app.get('/txt', async (req, res) => {
  // Send TXT Message
  // ============================================================

  const client = await twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN,
  )

  client.messages
    .create({
      body: 'Hello from Node',
      to: '+17608460475', // Text this number
      from: '+12058464907', // From a valid Twilio number
    })
    .then(message => {
      console.log(message.sid)
      res.json(message)
    })
  // ============================================================
})

http.createServer(app).listen(port, () => {
  log(`Listening on http://localhost:${port}`)
})
