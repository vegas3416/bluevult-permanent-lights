#!/usr/bin/env node
// Simulate the contact form submission flow.
// By default this is a dry run and will only print actions.
// To actually perform requests, set RUN_REAL=1 in the environment and ensure env vars are set (.env or exported):
// VITE_FORMSUBMIT_EMAIL, VITE_SMS_GATEWAY, VITE_FORMSPREE_ID

import fs from 'fs';
import path from 'path';

// Simple .env loader (only for this script) to avoid adding dependencies.
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split(/\r?\n/).forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const eq = trimmed.indexOf('=');
    if (eq === -1) return;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
    if (!(key in process.env)) process.env[key] = val;
  });
}

const RUN_REAL = process.env.RUN_REAL === '1';

const payload = {
  name: process.env.SIM_NAME || 'Test User',
  email: process.env.SIM_EMAIL || 'test@example.com',
  message: process.env.SIM_MESSAGE || 'This is a test submission from simulateSubmission.js',
};

const FORMSUBMIT_EMAIL = process.env.VITE_FORMSUBMIT_EMAIL || '';
const SMS_GATEWAY = process.env.VITE_SMS_GATEWAY || '';
const FORMSPREE_ID = process.env.VITE_FORMSPREE_ID || '';
const SERVERLESS_ENDPOINT = process.env.SERVERLESS_ENDPOINT || '/.netlify/functions/contact';

function short(v, n = 120) {
  return (v || '').toString().slice(0, n);
}

console.log('Payload:');
console.log(JSON.stringify(payload, null, 2));
console.log('Configuration:');
console.log({ FORMSUBMIT_EMAIL, SMS_GATEWAY, FORMSPREE_ID, SERVERLESS_ENDPOINT, RUN_REAL });

async function run() {
  // 1) FormSubmit
  if (FORMSUBMIT_EMAIL) {
    const url = `https://formsubmit.co/${encodeURIComponent(FORMSUBMIT_EMAIL)}`;
    console.log('\n[DRY] Would POST full form to FormSubmit:', url);
    if (RUN_REAL) {
      console.log('-> Performing real POST to FormSubmit...');
      const fm = new URLSearchParams();
      fm.append('name', payload.name);
      fm.append('email', payload.email);
      fm.append('message', payload.message);
      fm.append('_captcha', 'false');
      fm.append('_subject', 'New contact from website');
      const res = await fetch(url, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: fm,
      });
      console.log('FormSubmit response:', res.status, await res.text());
    }
  } else {
    console.log('\n[DRY] FormSubmit not configured (VITE_FORMSUBMIT_EMAIL empty)');
  }

  // 2) SMS via email-to-SMS gateway
  if (SMS_GATEWAY) {
    const url = `https://formsubmit.co/${encodeURIComponent(SMS_GATEWAY)}`;
    const shortMsg = `${payload.name}: ${short(payload.message, 120)}`;
    console.log('\n[DRY] Would POST short message to SMS gateway via FormSubmit:', url);
    console.log('[DRY] SMS content:', shortMsg);
    if (RUN_REAL) {
      console.log('-> Performing real POST to FormSubmit (SMS)...');
      const fm = new URLSearchParams();
      fm.append('message', shortMsg);
      fm.append('_captcha', 'false');
      const res = await fetch(url, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: fm,
      });
      console.log('FormSubmit(SMS) response:', res.status, await res.text());
    }
  } else {
    console.log('\n[DRY] SMS_GATEWAY not configured');
  }

  // 3) Serverless endpoint (Netlify function)
  console.log(
    '\n[DRY] Would POST JSON payload to serverless endpoint (if running):',
    SERVERLESS_ENDPOINT
  );
  if (RUN_REAL) {
    try {
      const res = await fetch(SERVERLESS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      console.log('Serverless response:', res.status, await res.text());
    } catch (err) {
      console.log('Serverless POST failed:', String(err));
    }
  }

  // 4) Formspree fallback
  if (FORMSPREE_ID) {
    const url = `https://formspree.io/f/${FORMSPREE_ID}`;
    console.log('\n[DRY] Would POST JSON to Formspree:', url);
    if (RUN_REAL) {
      const res = await fetch(url, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      console.log('Formspree response:', res.status, await res.text());
    }
  } else {
    console.log('\n[DRY] Formspree not configured (FORMSPREE_ID empty)');
  }

  console.log(
    '\nSimulation complete. To actually perform requests set RUN_REAL=1 and provide the appropriate env vars in .env or the environment.'
  );
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
