const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const {
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET,
  GMAIL_REFRESH_TOKEN,
  GMAIL_USER_EMAIL,
} = require('../config/gmailConfig');
const { generateLeadEmailTemplate } = require('../utils/emailTemplate');

const oauth2Client = new google.auth.OAuth2(
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET
);

oauth2Client.setCredentials({ refresh_token: GMAIL_REFRESH_TOKEN });

async function createTransport() {
  const accessTokenResponse = await oauth2Client.getAccessToken();
  const accessToken = accessTokenResponse?.token || accessTokenResponse;

  if (!accessToken) {
    throw new Error('Unable to acquire Gmail access token. Check your OAuth2 credentials and refresh token.');
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: GMAIL_USER_EMAIL,
      clientId: GMAIL_CLIENT_ID,
      clientSecret: GMAIL_CLIENT_SECRET,
      refreshToken: GMAIL_REFRESH_TOKEN,
      accessToken,
    },
  });
}

async function sendLeadNotification(lead) {
  const transporter = await createTransport();
  const { html, text } = generateLeadEmailTemplate(lead);

  const mailOptions = {
    from: `CRM Notifications <${GMAIL_USER_EMAIL}>`,
    to: GMAIL_USER_EMAIL,
    subject: 'New Lead Added Successfully',
    text,
    html,
  };

  const info = await transporter.sendMail(mailOptions);

  return {
    messageId: info.messageId,
    accepted: info.accepted,
    rejected: info.rejected,
    response: info.response,
  };
}

module.exports = {
  sendLeadNotification,
};
