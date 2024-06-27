let turno =1;
let fichas=["O","X"];
let puestas =0;
let partidaAcabada=false;
let textoVIctoria=document.querySelector("#yexto-victoria");
let botones = Array.from(document.getElementsByTagName("button"));

botones.forEach(x=> x.addEventListener("click", ponerFicha));

function ponerFicha(event){
    let botonPulsado=event.target;
    if(!partidaAcabada && botonPulsado.innerHTML==""){
        botonPulsado.innerHTML=fichas[turno];
        puestas+=1;

        let estadoPartida= estado();
        if(estadoPartida==0){
            cambiarTurno();
            if(puestas<9){
                ia();
                estadoPartida= estado();
                puestas+=1;
                cambiarTurno();
            }
        }

        if(estadoPartida==1){
            textoVIctoria.style.visibility = "visible";
            partidaAcabada=true;
        }else if(estadoPartida ==-1){
            textoVIctoria.innerHTML="has perdido";
            partidaAcabada=true;
            textoVIctoria.style.visibility = "visible";
        }
    }
}

function cambiarTurno(){
    if(turno==1){
        turno=0;
    }else{
        turno==1;
    }
}

function estado(){
    posicionVIctoria =0;
    nEstado=0;
    function sonIguales (...args){
        valores = args.map(x=>x.innerHTML);
        if(valores[0] != "" && valores.every((x,i,arr)=>x===arr[0])){
            args.forEach(x=>x.style.backgroundColor= "Fuchsia")
            return true;
        }else{
            return false;
        }
    }
    
}