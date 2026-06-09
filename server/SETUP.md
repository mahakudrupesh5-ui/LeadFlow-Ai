# CRM Dashboard - Backend Setup (Gmail Email Notifications)

This backend implementation supports sending Gmail notifications whenever a new lead is added via `/api/leads`.

## 1. Install dependencies

Open a terminal at the backend folder and run:

```bash
cd server
npm install
```

## 2. Environment setup

Create a `server/.env` file, or copy from `server/.env.example`, and set these values:

```env
PORT=5000
GMAIL_CLIENT_ID=your_google_client_id
GMAIL_CLIENT_SECRET=your_google_client_secret
GMAIL_REFRESH_TOKEN=your_google_refresh_token
GMAIL_USER_EMAIL=your_gmail_address@example.com
```

> Make sure the Gmail OAuth credentials include the scope:
> `https://www.googleapis.com/auth/gmail.send`

## 3. Start the backend

```bash
cd server
npm run dev
```

The backend runs by default on `http://localhost:5000`.

## 4. API route

### POST /api/leads

This endpoint accepts lead data and sends a Gmail notification to the configured `GMAIL_USER_EMAIL`.

#### Request body

```json
{
  "name": "Rupesh Mahaku",
  "email": "lead@example.com",
  "phone": "+1234567890",
  "company": "Acme Ltd",
  "source": "LinkedIn"
}
```

#### Success response

```json
{
  "message": "Lead received and notification sent successfully",
  "lead": {
    "name": "Rupesh Mahaku",
    "email": "lead@example.com",
    "phone": "+1234567890",
    "company": "Acme Ltd",
    "source": "LinkedIn"
  },
  "emailResult": {
    "messageId": "<id>",
    "accepted": ["your_gmail_address@example.com"],
    "rejected": [],
    "response": "250 2.0.0 OK ..."
  }
}
```

## 5. Frontend Axios example

```js
import axios from 'axios';

const leadData = {
  name: 'Rupesh Mahaku',
  email: 'lead@example.com',
  phone: '+1234567890',
  company: 'Acme Ltd',
  source: 'LinkedIn',
};

axios.post('http://localhost:5000/api/leads', leadData)
  .then(response => {
    console.log('Lead created:', response.data);
  })
  .catch(error => {
    console.error('Lead creation failed:', error.response?.data || error.message);
  });
```

## 6. Generate a Gmail refresh token

If you do not yet have a refresh token, use the helper script:

```bash
cd server
node scripts/getRefreshToken.js
```

Then:

1. Open the URL printed by the script.
2. Sign in as `mahakudrupesh5@gmail.com`.
3. Grant the Gmail send permission.
4. Copy the `code` parameter from the redirect URL.
5. Paste the code back into the script prompt.
6. Copy the returned `refresh_token` into `server/.env`.

Your `server/.env` should include:

```env
PORT=5000
GMAIL_CLIENT_ID=124719369533-55o05fqv1fcaa56mu00alcl6vnd85tgd.apps.googleusercontent.com
GMAIL_CLIENT_SECRET=your_google_client_secret
GMAIL_REFRESH_TOKEN=the_refresh_token_received
GMAIL_USER_EMAIL=mahakudrupesh5@gmail.com
```

> Important: `GMAIL_CLIENT_SECRET` must be the actual secret from your Google Cloud Console, not the same value as the client ID.

## 7. Backend structure

- `server/routes/leads.js` — route definition for `/api/leads`
- `server/controllers/leadsController.js` — request handling and validation
- `server/services/emailService.js` — reusable Gmail email sender using OAuth2
- `server/config/gmailConfig.js` — environment configuration loader
- `server/middleware/errorHandler.js` — centralized Express error handling
- `server/utils/validation.js` — lead payload validation
- `server/utils/emailTemplate.js` — email body template generator

## 7. Notes

- This implementation sends Gmail notifications only.
- No database storage is required for the lead notification flow.
- Errors are handled by centralized middleware and returned as JSON.

