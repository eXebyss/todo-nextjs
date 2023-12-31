# "TODO app" 📝

This is a personal example project of TODO app created with [Next.js](https://nextjs.org/).

## Usage ⚠️

It is pretty simple:

1. Internet connection is required. <b>Offline mode is not supported.</b>
1. Create a new collection or enter ID of already existing one collection.
1. Be aware. Nothing is stored locally forever! Collection is saved in DB and it is safe. Be sure to copy-paste collection ID somewhere, so you can easily access it anytime.
1. If you forgot to copy-paste collection and application is reset, than the only one way to get your collection ID is to check your browser history. If history is cleared, than access to your collection is lost forever.
1. When collection is created, create a new todo list by simply giving it a name.
1. Input a text and wait for 2 seconds. Every new input is submitted after 2 sec of idle.
1. When new todo list created, you are good to go with adding new TODOs.

## Data 🗃️

<b>Nothing is tracked!</b> No data about you is collected! 🕵️

## Database 🗄️

Current application is using [mongoDB](https://www.mongodb.com/) database.

In order to run and use the application locally and successfully, you need:

1. Register a new user in [mongoDB](https://www.mongodb.com/) or use already existing one.
1. Create a new database. See more info: [manual](https://www.mongodb.com/basics/create-database).
1. Setup connection setting for your created mongoDB database.
1. Create or configure `.env` file under root directory.
1. Provide connection value from mongoDB to `MONGODB_URI`.

## Local installation 💽

First, clone the repo:

[https://github.com/eXebyss/todo-nextjs](https://github.com/eXebyss/todo-nextjs)

Second, install necessary dependencies by running a command:

```bash
npm i
# or
yarn i
# or
pnpm i
```

Third, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Last, but not least:

-   Check `.env.example` file and use it to configure your `.env` file.

Now you are ready to go!

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application running.

This project uses [Next.js](https://nextjs.org/) `app` router api.

## Authors 🧑‍💻

See: [AUTHORS](https://github.com/eXebyss/todo-nextjs/blob/master/AUTHORS)

## Code owners 👑

See: [CODEOWNERS](https://github.com/eXebyss/todo-nextjs/blob/master/CODEOWNERS)

## License ⚖️

See: [LICENSE](https://github.com/eXebyss/todo-nextjs/blob/master/LICENSE)

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.

## Links 🔗

-   [Github](https://github.com/eXebyss)
-   [LinkedIn](https://www.linkedin.com/in/mihails-fjodorovs-361a0a182/)
-   [Website](https://www.mihailsfjodorovs.com/)

## Changes 📃

See: [CHANGELOG](https://github.com/eXebyss/todo-nextjs/blob/master/CHANGELOG.md)

## Stack ⚙️

-   Next.js
-   Tailwind CSS
-   SWR
-   MDX
-   MongoDB (optional)
-   Vercel KV Database (optional)
-   Vercel

## Cron Jobs 🤖

Next.js app is configured to handle Cron Jobs running by Vercel.

1. Every empty todo collection is deleted at the end of every saturday.
