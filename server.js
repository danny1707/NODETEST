import express from 'express';
import bcrypt from 'bcrypt';
import stripe from 'stripe';
import { initializeApp } from 'firebase/app';
import { getDoc, getFirestore } from 'firebase/firestore'


//Configuracion de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDg3kBvy9nG85knCMuVhj6b6FV1w7eZ1Fk",

    authDomain: "ecommerce-31e2a.firebaseapp.com",

    projectId: "ecommerce-31e2a",

    storageBucket: "ecommerce-31e2a.appspot.com",

    messagingSenderId: "301203238732",

    appId: "1:301203238732:web:1c8ef29bcda382665469e9"

}

const firebase = initializeApp(firebaseConfig)
const db = getFirestore()
    //Inicializacion del servidor
const app = express()

//middleware
app.use(express.static('public'))
app.use(express.json()) //Permite compartir forms

//Rutas

//Home
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public' })
})

// ruta para registrar
app.get('/singup', (req, res) => {
    res.sendFile('singup.html', { root: 'public' })
})

app.post('/singup', (req, res) => {
    const { name, email, password, number, tac } = req.body

    // Validaciones
    if (name.length < 3) {
        res.json({ 'alert': 'name must be have 3 letters long' })
    } else if (!email.length) {
        res.json({ 'alert': 'enter you email' })
    } else if (password.length < 8) {
        res.json({ 'alert': 'password must be have 8 letters long' })
    } else if (!Number(number) || number.length < 10) {
        res.json({ 'alert': 'invalid  number, please enter valid one' })
    } else if (!tac) {
        res.json({ 'alert': 'you must agree to our terms' })
    } else {
        //almacenar datos en un DB
        const users = collection(db, "users")
        getDoc(doc(users, email)).then(user => {
            if (user.exists()) {
                res.json({ 'alert': 'email already exist' })
            } else {
                //encriptar password
            }
        })
    }
})

app.listen(3000, () => {
    console.log('Servidor en Ejecucion...');
})