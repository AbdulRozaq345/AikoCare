This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Connecting to the Laravel API

The app talks to a Laravel backend (Sanctum + session cookies). To avoid TLS/domain mismatches while developing, point the frontend at the same host/port as your Laravel server:

1. **Expose the base URL** – create a `.env.local` file and set:

	```bash
	NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
	```

	The Axios helper in `lib/axios.ts` reads this variable and falls back to `http://127.0.0.1:8000` when it is missing.

2. **Allow Sanctum cookies** – in `laravel/.env`, set

	```env
	SANCTUM_STATEFUL_DOMAINS=127.0.0.1:3000,localhost:3000
	SESSION_DOMAIN=127.0.0.1
	```

	and ensure `config/cors.php` has `supports_credentials => true` with your frontend origin listed in `allowed_origins`.

3. **Keep protocols consistent** – use plain `http` for both servers unless you have configured HTTPS certificates. Browsers will block `https://localhost` if your Laravel dev server only serves HTTP.

After changing env files, restart both the Laravel server (`php artisan serve`) and Next.js (`npm run dev`) so the new settings are loaded.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
