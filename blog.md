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
To use dotenv, add following code in app.ts

```js
import dotenv from "dotenv";
dotenv.config();
```
