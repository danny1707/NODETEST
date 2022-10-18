import express from 'express';
import bcrypt from 'bcrypt';
import stripe from 'stripe';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'


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
app.use(express.json())//Permite compartir forms

//Rutas

//Home
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' })
})

app.listen(3000, () => {
  console.log('Servidor en Ejecucion...');
})