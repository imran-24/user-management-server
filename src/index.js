import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router/index.js";

import { getApp } from "firebase-admin/app";

dotenv.config();
const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(bodyParser.json());

const server = http.createServer(app);

const port = process.env.PORT

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.use("/", router());

import admin from "firebase-admin"

// import { readFile } from "fs/promises";
// const serviceAccount = JSON.parse(
//   await readFile(new URL("../serviceAccountKey.json", import.meta.url))
// );

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const serviceAccount = {
    type: "service_account",
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'), // Fix for multiline private_key
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
    universe_domain: process.env.UNIVERSE_DOMAIN
};

console.log(serviceAccount)
// Initialize Firebase app
export const firebaseApp = getApp.length
  ? getApp()
  : admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });



