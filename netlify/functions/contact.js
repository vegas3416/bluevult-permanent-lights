// Netlify serverless function to send an SMS notification via Twilio when a contact form is submitted.
// Environment variables required:
// TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM (Twilio phone number), NOTIFY_TO (your phone number)

exports.handler = async function (event, context) {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    const data = (() => {
      try {
        return JSON.parse(event.body || '{}');
      } catch (e) {
        // fallback to URLSearchParams style
        const params = new URLSearchParams(event.body || '');
        const obj = {};
        for (const [k, v] of params.entries()) obj[k] = v;
        return obj;
      }
    })();

    const name = data.name || 'Anonymous';
    const email = data.email || 'no-email';
    const message = data.message || '';

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const from = process.env.TWILIO_FROM;
    const to = process.env.NOTIFY_TO;

    if (!accountSid || !authToken || !from || !to) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error:
            'Twilio not configured. Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM and NOTIFY_TO.',
        }),
      };
    }

    const body = `New quote request from ${name} (${email}): ${message.substring(0, 320)}`;

    const payload = new URLSearchParams();
    payload.append('Body', body);
    payload.append('From', from);
    payload.append('To', to);

    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          Authorization: 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payload.toString(),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      return { statusCode: 502, body: JSON.stringify({ error: text }) };
    }

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: String(err) }) };
  }
};
