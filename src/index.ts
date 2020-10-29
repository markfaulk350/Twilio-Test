import * as dotenv from 'dotenv'
dotenv.config()

const log = console.log

import twilio from 'twilio'

async function main() {
  try {
    const client = await twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    )

    client.calls.create(
      {
        url: 'http://demo.twilio.com/docs/voice.xml',
        // to: '+16166359732',  // Ryan
        to: '+17608460475', // Mark
        // from: '+17608460475',  // Mark
        from: '+12058464907', // Twilio
      },
      (err, call) => {
        if (err) {
          log(err)
        } else {
          log(call.sid)
        }
      },
    )
  } catch (err) {
    log(err)
  }
}

main()
