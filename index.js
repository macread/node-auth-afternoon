require('dotenv').config();

const students = require('./students')

const express = require('express');
const session = require('express-session');

const passport = require('passport');
const Auth0Strategy = require('passport-auth0');


const app = express();
const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL
} = process.env;

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid email profile'
}, (accessToken, refreshToken, extraParams, profile, done) => {
    done(null, profile);
}))

passport.serializeUser((user, done)=>{
    done(null, { clientID: user.id, email: user._json.email, name: user._json.name});
});

passport.deserializeUser((obj, done)=>{
    done(null, obj);
});

app.get('/login',
    passport.authenticate('auth0',
        {successRedirect: '/students', failureRedirect: '/login', connection: 'github'}
    )
);

app.get('/students', (req, res, next) => {
    res.status(200).send(students);
});



app.listen( SERVER_PORT, () => { console.log(`Server listening on port ${SERVER_PORT}`); } );