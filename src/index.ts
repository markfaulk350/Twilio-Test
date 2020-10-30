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
        // url: 'http://demo.twilio.com/docs/voice.xml',
        // url: `http://79aa7f943887.ngrok.io/outbound/${encodeURIComponent(
        //   '+17608460475',
        // )}`,

        url: `http://${req.headers.host}/outbound/${encodeURIComponent('+17608460475')}`,
        // url: `http://${request.headers.host}/outbound/${encodeURIComponent(
        //   salesNumber,
        // )}`,
        // to: '+16166359732',  // Ryan
        to: '+17608460475', // Mark
        // from: '+17608460475',  // Mark
        from: '+12058464907', // Twilio
        // twiml: 'Hello World how are you today',
        // from: '+17605944465' // Richie
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

  // twimlResponse.say('Thanks for contacting our sales department. Our next available representative will take your call.');
  twimlResponse.say({
    voice: 'alice'
  }, `Hey Ryan it's Mark. What does a robot do at the end of a one night stand? He nuts and bolts. Ha Ha Ha Ha Ha Ha. This message would normally say something like thanks for contacting our loan department. Our next available representative will take your call. In the end, they will be forwarded to the loan officer specified in hub spot. This should automatically call my cell phone number now.`);

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
