import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

import { getFirebaseConfig } from './firebase-config';

// Inicializar firebase
const firebaseAppConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseAppConfig);

function registrarUsuario(user){
    // Obtener la base datos
    const db = getDatabase();

    // escribir un nuevo usuario
}

const username = document.getElementById("username");
const password = document.getElementById("password");
const registraBtn = document.getElementById("registrar_btn");
console.log(username);

const registroEvento = (e, event) => {
    const user = {
        nombre: username.value,
        pass: password.value
    }
    const jsonObject = JSON.stringify(user);
    console.log(jsonObject);
}

registraBtn.addEventListener("click", registroEvento);
