# Hyrule Help (T3 Demo App)

## Steps to Run Locally

1.  Clone down the code from the [gihtub repop](https://github.com/Mark-Mulligan/hyrule-help)

2.  Install all the dependencies

```
npm install
yarn install
etc.
```

3.  Make the following changes to the schema.prisma file in the db Source section

- change the provider to "sqlite" (you can uncomment the section where that is provided and comment out the provider set to postgresql)
- comment out the directURL variable (this will not be needed for local development)

4.  Create a .env file in the root of the project. You can copy over the .env.example as a starting template.

- Go ahead and update the NEXTAUTH_SECRET to a more secure string

5.  If the above steps have been followed, you should be able to generate a sqlite db file in the prisma directory by running the following command in your terminal in the root of the project

```
npx prisma db push
```

6.  (Optional) Add discord authentication. Use these [instructions](https://create.t3.gg/en/usage/first-steps#authentication) to register the app with discord and to get your DISCORD_CLIENT_ID and DISCORD_CLIENT_SECRET. These values will go in the .env file and allow you to login with discord.

7.  Note, you should be able to create and login in with users using the credentials feature. Just be aware that this is a demo app and the credentials features does not refresh the access tokens. This may cause some unexpected results if testing as a credentials user.

## Deploy the project

You will need to connect your project to a deployed database. I personally used supabase, but any deployed sql database should work. The T3 docs below have a lot of good advice about your different deployement options. I used vercel as it was the most straight forward process.

## T3 Readme Docs

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
