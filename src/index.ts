import * as dotenv from 'dotenv'
dotenv.config()

const log = console.log

import qs from 'qs'
import axios from 'axios'
import { AxiosRequestConfig } from 'axios'

async function main() {
  try {
    const base_url = 'https://api.twilio.com/2010-04-01'
    let url = `${base_url}/Accounts/${process.env.TEST_TWILIO_ACCOUNT_SID}/Calls.json`

    const data: any = {
      To: '+16166359732',
      From: '+17608460475',
    }

    const config: AxiosRequestConfig = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        // Authorization: `Basic ${
        //   process.env.TWILIO_ACCOUNT_SID + ':' + process.env.TWILIO_AUTH_TOKEN
        // }`,
      },
      auth: {
        username: process.env.TEST_TWILIO_ACCOUNT_SID || '',
        password: process.env.TEST_TWILIO_AUTH_TOKEN || ''
      }
    }

    const res = await axios.post(url, qs.stringify(data), config)
    log(res.data)


  } catch (err) {
    log(err)
  }
}

main()
