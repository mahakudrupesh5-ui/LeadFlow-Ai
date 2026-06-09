const readline = require('readline');
const { google } = require('googleapis');

const CLIENT_ID = process.env.GMAIL_CLIENT_ID || '124719369533-55o05fqv1fcaa56mu00alcl6vnd85tgd.apps.googleusercontent.com';
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET || '<your-google-client-secret-here>';
const REDIRECT_URI = 'http://localhost:5678/rest/oauth2-credential/callback';
const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

if (!CLIENT_ID || !CLIENT_SECRET || CLIENT_SECRET.includes('<your-google-client-secret')) {
  console.error('ERROR: Please set GMAIL_CLIENT_ID and GMAIL_CLIENT_SECRET in server/.env or this script before running.');
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: SCOPES,
  });

  console.log('1) Open this URL in your browser:');
  console.log(authUrl);
  console.log('\n2) After granting access, Google will redirect to:');
  console.log(REDIRECT_URI);
  console.log('   Copy the `code=` value from that URL.');

  const code = await ask('\nPaste the authorization code here: ');
  const { tokens } = await oauth2Client.getToken(code.trim());
  console.log('\nRefresh token received:');
  console.log(tokens.refresh_token || 'No refresh token returned.');
  console.log('\nCopy this value into server/.env as GMAIL_REFRESH_TOKEN.');
  console.log('\nFull token object:');
  console.log(JSON.stringify(tokens, null, 2));

  rl.close();
}

main().catch((err) => {
  console.error('Failed to get refresh token:', err.message || err);
  rl.close();
  process.exit(1);
});
