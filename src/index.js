import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, get,set } from 'firebase/database';
import {  getFirebaseConfig } from './firebase-config';
import { Post } from './Post'

// Inicializar firebase
const firebaseAppConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseAppConfig);
const db = getDatabase();



const username = document.getElementById("username");
const postInput = document.getElementById("postInput");
const publicarBtn = document.getElementById("publicarBtn");
const postCont = document.getElementById("postConteiner");



const publicarEvent = () => {
 
    postCont.innerHTML= "";

    set(ref(db, "posts/"+username.value+"'s post"),{
        nombre: username.value,
        content: postInput.value
    }).then(()=>{
        
    }).catch((error)=>{
        alert("papi paso esto: "+ error);
    });

    const newPost = {
       
        nombre: username.value,
        content: postInput.value
    }/*
   // referencia.set(newPost);
    const jsonObject = JSON.stringify(newPost);
    console.log(jsonObject);
    let postClass = new Post(username.value,postInput.value);
    postCont.appendChild(postClass.loadPost());

   /* 
const dbref = ref(db);

get(child(dbref,"posts/"))*/


  

}

function cargarPost(){

    

    const dbref = ref(db, 'posts');
    onValue(dbref, (snapshot) =>{
        const data = snapshot.val();
    
        snapshot.forEach((doc) => {
           console.log("entro");
            let v = JSON.stringify(doc.val());
            let pa = JSON.parse(v)
            console.log(pa.nombre + pa.content);
            let postClass = new Post(pa.nombre,pa.content);
        postCont.appendChild(postClass.loadPost());
        
        });
    
        console.log("lista", data);
        });
}

cargarPost();
publicarBtn.addEventListener("click", publicarEvent);
