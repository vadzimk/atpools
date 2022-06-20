import dotenv from 'dotenv';
dotenv.config();

const auth = {
  type: 'OAuth2',
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    accessToken: process.env.ACCESS_TOKEN,
    expires: 1484314697598,
}
const REDIRECT_URI='https://developers.google.com/oauthplayground'

const BASE_URL = process.env.NODE_ENV==='development' ? '/api' : ''

export {auth, REDIRECT_URI, BASE_URL}