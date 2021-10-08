0. Install typescript
   `npm install -D typescript @types/node ts-node nodemon`
1. `npm init -y`
2. `tsc --init`
3. git init
4. add .gitignore (remove blog.md)
5. edit `tsconfig.json`
   ```json
   "outDir": "./dist",
   "rootDir": "./src"
   ```
6. Create `index.ts` in src folder
7. Note: npm install --save-dev ts-node nodemon ( Because ts-node is installed you can directily use `nodemon index.ts`)
   Source: https://stackoverflow.com/questions/37979489/how-to-watch-and-reload-ts-node-when-typescript-files-change
8. Add these scripts in `package.json`

   ```json
   "start": "node dist/app.js",
   "dev": "nodemon src/app.ts",
   "build": "tsc -p ."
   ```

9. Install required packages
   `npm i express mongoose passport passport-google-oauth20`

10. Install type definition files for some packages as devdependencies
    npm i -D @types/express @types/passport @types/passport-google-oauth20

Create an express server

```js
import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("App listening on port: " + PORT);
});
```

Now setup our database connection, before that lets setup a file to store
confidential credentials like the database URI. For that we will have to install a package
`npm install dotenv`

Now create a .env file in the root of the project and add your database uri, like this
`dbURL = mongodb://localhost:27017/PROJECT_NAME`

Now we need to create a layer between our app and the .env file to check if the env variables are available and valid.
create a secrets.ts file in `utils` folder inside the src folder (ie where your app.ts exist)

```js
import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
  dotenv.config({ path: ".env" });
} else {
  console.error(".env file not found.");
}

export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production";

export const MONGO_URI = prod
  ? (process.env.MONGO_PROD as string)
  : (process.env.MONGO_LOCAL as string);

if (!MONGO_URI) {
  if (prod) {
    console.error(
      "No mongo connection string. Set MONGO_PROD environment variable."
    );
  } else {
    console.error(
      "No mongo connection string. Set MONGO_LOCAL environment variable."
    );
  }
  process.exit(1);
}
```

Lets now setup up `ejs` which will help us render html to the client
`npm i ejs`

In your app.ts

```js
app.set("view engine", "ejs");
```

This will setup a view engine which will look for a views folder in root of the project for ejs templates.
so create a folder views and create a home.ejs file in it. We can write a simple html code in it.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Oauth App</title>
  </head>

  <body>
    <h1>This is home</h1>
  </body>
</html>
```

now lets setup the home route, to see if our view engine works

```js
app.get("/", (req, res) => {
  res.render("home");
});
```

Next up, to setup our authentication routes lets create a folder `routes` inside src folder
add a file `authRoutes.ts`

```js
import express from "express";
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});

export default router;
```

Now in app.ts, import the authRoutes, your app.ts should look sth like this

```js
import express from "express";
import mongoose from "mongoose";
import { MONGO_URI } from "./utils/secrets";
import authRoutes from "./routes/authRoutes";

const app = express();

app.set("view engine", "ejs");

// connect to mongodb
mongoose.connect(MONGO_URI, () => {
  console.log("connected to mongodb");
});

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.render("home");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("App listening on port: " + PORT);
});
```
