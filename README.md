# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## SEO, contact form and deployment notes (updates added)

Quick notes about recent improvements and how to configure them locally or in production:

- Head management: this project now uses `react-helmet-async` for per-page titles and meta tags. Install it locally after pulling:

```bash
npm install react-helmet-async
```

- Contact form: the contact form can POST to Formspree if you set an environment variable `VITE_FORMSPREE_ID` in a `.env` file (example: `VITE_FORMSPREE_ID=yourFormId`). If not set, the form still shows a client-side thank-you state.

- Contact form: the contact form can POST to Formspree if you set an environment variable `VITE_FORMSPREE_ID` in a `.env` file (example: `VITE_FORMSPREE_ID=yourFormId`).
- Alternatively, there's a Netlify serverless function that will send an SMS to notify you when a quote request is submitted. To enable it, set these environment variables in Netlify (or a `.env` for local `netlify dev`):


- Form submit options (free):
	- FormSubmit (formsubmit.co) — free and zero-backend option: set `VITE_FORMSUBMIT_EMAIL=you@yourdomain.com` in `.env`. The site will POST directly to FormSubmit which forwards to your email. This is the easiest free option and recommended if you want email notifications immediately without serverless.
	- To also get an SMS for each lead without paid services, you can use an email-to-SMS gateway address for your carrier. Set `VITE_SMS_GATEWAY` to the carrier gateway address for your phone (e.g. `15124611926@txt.att.net` or `15124611926@vtext.com`) and the site will POST a short message to that address via FormSubmit as well.
	- Formspree — another form service; set `VITE_FORMSPREE_ID` to your Formspree form id and Formspree will handle forwarding/submissions.

Notes and caveats about email-to-SMS gateways:
	- Email-to-SMS gateways are carrier-specific and rely on the mobile carrier converting the incoming email to SMS for the target phone number. Delivery is not guaranteed and long messages may be truncated.
	- Common gateway domains (examples):
		- AT&T: number@txt.att.net
		- Verizon: number@vtext.com
		- T-Mobile: number@tmomail.net
		- Sprint (now part of T-Mobile): number@messaging.sprintpcs.com
	- Replace `number` with your 10-digit phone number (no separators), e.g. `15124611926@vtext.com`.
	- Some gateways may strip links or block messages; test thoroughly.

- Alternatively, there's a Netlify serverless function that will send an SMS to notify you when a quote request is submitted. To enable it, set these environment variables in Netlify (or a `.env` for local `netlify dev`):

```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_FROM=+1XXXXXXXXXX   # your Twilio phone number
NOTIFY_TO=+1YYYYYYYYYY     # the phone number you want to receive SMS notifications
```

The serverless endpoint is available at `/.netlify/functions/contact`. If the endpoint is not configured, the form will fall back to the client-side thank-you UI so users are not blocked.

- Sitemap and robots: a `public/sitemap.xml` and `public/robots.txt` were added; update the `https://example.com` URLs to your production domain before publishing.

If you'd like, I can wire up a serverless endpoint (Netlify/Vercel) instead of Formspree — tell me which provider you plan to use.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)


## Facebook gallery auto-sync

This repo can automatically pull photos from your Facebook Page into the website gallery via Supabase.

1. Supabase migration + function are included in this repo (`supabase/migrations/...gallery_facebook_photos.sql` and `supabase/functions/sync-facebook-gallery`).
2. In Supabase Edge Function secrets, set:
   - `FACEBOOK_PAGE_ACCESS_TOKEN` (long-lived Page token)
   - `FACEBOOK_PAGE_ID` (optional, defaults to BlueVult page id)
   - `GALLERY_SYNC_SECRET` (shared secret)
3. In GitHub repo secrets, set:
   - `SUPABASE_ANON_KEY`
   - `GALLERY_SYNC_SECRET`
4. Trigger `.github/workflows/facebook-gallery-sync.yml` manually once, then it runs daily on schedule.

The public site reads from `public.gallery_facebook_photos` through Supabase with anon access enabled by RLS.
