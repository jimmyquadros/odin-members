require('dotenv').config();
const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connection = require('./config/database');
const router = require('./routes/router');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        client: connection,
        collectionName: 'sessions',
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    },
}));

require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);

app.listen(3000, console.log('listening on port 3000...'));