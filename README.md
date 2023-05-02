# Remix Race Stack

![The Remix Race Stack](https://user-images.githubusercontent.com/43375532/235511500-8bb82094-8599-4dc3-84d9-3c2d128c4678.png)

Learn more about [Remix Stacks](https://remix.run/stacks).

```
npx create-remix@latest --template jose-donato/race-stack
```

## What's in the stack

- [Cloudflare Pages](https://pages.cloudflare.com/) for hosting
- [Cloudflare D1](https://developers.cloudflare.com/d1/) and [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm) for database
- Email/Password Authentication with [remix-auth](https://github.com/sergiodxa/remix-auth) - easily extensible to other auth providers like github, google etc.
- Styling with [Tailwind](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com), [Radix-UI](https://radix-ui.com/), and [Lucide Icons](https://lucide.dev/)
- Dark mode using cookies
- [Posthog](https://posthog.com/) for analytics, can be easily changed to another analytics provider. Analytics are only imported when user opts in.
- Form validation with [remix-validation-form](https://www.remix-validated-form.io/) and [zod](https://zod.dev/)
- Code formatting with [Prettier](https://prettier.io)
- Linting with [ESLint](https://eslint.org)
- Static Types with [TypeScript](https://typescriptlang.org)

Want to modify something on the stack? Create an issue or fork it, change it, and use `npx create-remix --template your/repo`! Make it your own.

## Development

This project uses D1 for its database. Steps are straightforward and can be found in the [D1 docs](https://developers.cloudflare.com/d1/get-started/).
If the following doesn't work, please refer to the docs mentioned above. We will be utilizing Wrangler for local development to emulate the Cloudflare runtime.

1. Install wrangler - `npm install -g wrangler`
2. Create a new D1 database named `race-stack` (or whatever you want to name it) - `wrangler d1 create race-stack`
3. Make sure your wrangler.toml file has the correct database name and id (check [./wrangler.toml](./wrangler.toml) for an example)
4. Modify your drizzle schema `app/lib/schema.ts` to match your needs
5. Run `npm run generate` to generate your sql file
6. Run `wrangler d1 execute race-stack --local --file=./drizzle/<file>.sql` to migrate your database
7. Install project dependencies - `npm install`
8. Start the server - `npm run dev`

Open up [http://127.0.0.1:8788](http://127.0.0.1:8788) and you should be ready to go!

### Relevant code:

This is a simple app, but it's a good example of how you can build a full stack app with Remix fully deployed on the edge using Cloudflare products. The main functionality is creating users, logging in and out, and creating teams that may include one or more users. The code that handles this is in:

- drizzle database schema [./app/lib/schema.ts](./app/lib/schema.ts)
- auth for login [./app/lib/auth.server.ts](./app/lib/auth.server.ts) and [./app/routes/login.tsx](./app/routes/login.tsx)
- auth for register [./app/routes/register.tsx](./app/routes/register.tsx)
- creating teams [./app/routes/app.teams.new](./app/routes/app.teams.new)

## Deployment

### Cloudflare Pages

1. Fork this repo
2. If you don't already have an account, then [create a Cloudflare account here](https://dash.cloudflare.com/sign-up/pages) and after verifying your email address with Cloudflare, go to your dashboard and follow the [Cloudflare Pages deployment guide](https://developers.cloudflare.com/pages/framework-guides/deploy-anything).
3. Connect your forked repo to your new Cloudflare Pages project

### Cloudflare D1

1. Create a new D1 database named `race-stack` (or whatever you want to name it) - `wrangler d1 create race-stack`
2. Make sure your wrangler.toml file has the correct database name and id (check [./wrangler.toml](./wrangler.toml) for an example)
3. Go into the project settings in Cloudflare Pages project, visit the functions tab, and create a D1 database binding. Variable name should be `DB` and the value should be the database name you got from step 1.
4. Deploy the database by running `wrangler d1 execute race-stack --file=./drizzle/<file>.sql`

### Type Checking

This project uses TypeScript. It's recommended to get TypeScript set up for your editor to get a really great in-editor experience with type checking and auto-complete. To run type checking across the whole project, run `npm run typecheck`.

### Linting

This project uses ESLint for linting. That is configured in `.eslintrc.js`.

### Formatting

We use [Prettier](https://prettier.io/) for auto-formatting in this project. It's recommended to install an editor plugin (like the [VSCode Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)) to get auto-formatting on save. There's also a `npm run format` script you can run to format all files in the project.
