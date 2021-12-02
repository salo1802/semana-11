import { getDatabase, ref, onValue, get,push, set } from 'firebase/database';

export class Post{

    constructor(name, content){
        this.name = name;
        this.content = content;
    }

    loadPost = ()=>{
        let component = document.createElement('div');
        component.className = 'postclass';
            
        let conteinerUP = document.createElement('div');
            conteinerUP.className = 'partearriba';


            let contentConteiner = document.createElement('h2');
            contentConteiner.innerHTML = this.content;

            let nameConteiner = document.createElement('h5');
            nameConteiner.innerHTML = "@"+ this.name;
          
            let conteinerDown = document.createElement('div');
            conteinerDown.className="contD";



            let respInput = document.createElement('input');
            respInput.placeholder = "Escribe una respuesta";
            respInput.className = "input";

            let reBtn = document.createElement('button')
            reBtn.innerHTML = "Responder"

            this.cargarRespuestas(conteinerDown);

            reBtn.addEventListener("click", (e,ev)=>{
                const res = respInput.value;
                const db = getDatabase();
                const  newResRef = push(ref(db,'posts/'+ this.name+"'s post/"+"respuestas"));
                set(newResRef,res)
                this.cargarRespuestas(conteinerDown);
            });

            conteinerDown.appendChild(respInput);
            conteinerDown.appendChild(reBtn);
            conteinerUP.appendChild(contentConteiner);
            conteinerUP.appendChild(nameConteiner);
            component.appendChild(conteinerUP);
            component.appendChild(conteinerDown)


        return component;
    }


    cargarRespuestas(conteinerD){
        conteinerD.innerHTML="";

        const db = getDatabase();


    const dbref = ref(db, 'posts/'+ this.name+"'s post/"+"respuestas");
    onValue(dbref, (snapshot) =>{
        const data = snapshot.val();
    
        snapshot.forEach((doc) => {
           console.log("entro a las respuestas");
            let respuesta = document.createElement('h3');
            respuesta.innerHTML = doc.val();

       conteinerD.appendChild(respuesta);
        
        });
    
        console.log("lista", data);
        });
    }

}