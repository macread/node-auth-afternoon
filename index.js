require('dotenv').config();

const express = require('express');
const session = require('express-session');

const app = express();
const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL
} = process.env;


app.listen( SERVER_PORT, () => { console.log(`Server listening on port ${SERVER_PORT}`); } );