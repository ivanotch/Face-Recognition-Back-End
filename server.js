import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import knex from 'knex';
import {handleRegister} from './controllers/Register.js';
import {handleSignin} from './controllers/Signin.js';
import {handleProfile} from './controllers/Profile.js';
import {handleImage, handleApiCall} from './controllers/Image.js';

//alternative
// connectionString : process.env.DATABASE_URL,
//         ssl: {rejectUnauthorized: false},
//         host: process.env.DB_HOST,
//         port: 5432,
//         user: process.env.DB_USER,
//         password: process.env.DB_PW,
//         database: process.env.DB_DB 


const db = knex({
    client: 'pg',
    connection: {
        connectionString : process.env.DATABASE_URL,
        ssl: true,
        
    } 
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("working")
})

app.post('/signin', (req, res) => {handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => {handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {handleProfile(req, res, db)})

app.put('/image', (req, res) => {handleImage(req, res, db)})

app.post('/imageurl', (req, res) => {handleApiCall(req, res)})

app.listen(process.env.PORT || 3001, () => {
    console.log(`App is Running on port ${process.env.PORT}`)
});
