import express from 'express';
import bcrypt, { compare } from 'bcrypt';
import stripe from 'stripe';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, collection, getDoc, getFirestore, setDoc, getDoc } from 'firebase/firestore'


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

    //Ruta login
    app.get('/login', (req, res) => {
        res.sendFile('login.html', { root: 'public' })
    })

    app.post('/login', (req, res) => {
        const { email, password } = req.body

        if (!email.length || !password.length) {
            return res.json({
                'alert': 'fill al the inputs'
            })
        }
        const users = collection(db, 'users')
        getDoc(doc(users, email))
            .then(user => {
                if (!user.exists()) {
                    return res.json({
                        'alert': 'user doesnt exist'
                    })
                } else {
                    bcrypt.compare(password, user.data().password, (err, result) => {
                        if (result) {
                            let data = user.data()
                            return res.json({
                                name: data.name,
                                email: data.email,
                                seller: data.seller
                            })
                        } else {
                            return res.json({ 'alert': 'password incorrect' })
                        }
                    })
                }
            })
    })



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

                bcrypt.genSalt(10, (err, hash) => {
                    req.body.password = hash
                    req.body.seller = false
                    setDoc(doc(users, email), req.body).then(data => {
                        res.json({
                            name: req.body.name,
                            emal: req.body.email,
                            seller: req.body.seller
                        })
                    })
                })
            }
        })
    }
})

app.listen(3000, () => {
    console.log('Servidor en Ejecucion...');
})