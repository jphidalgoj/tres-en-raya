let turno =1;
let fichas=["O","X"];
let puestas =0;
let partidaAcabada=false;
let textoVIctoria=document.querySelector("#texto-victoria");
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
                intA();
                 
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
        turno=1;
    }
}

function estado(){
    let posicionVIctoria =0;
    let nEstado=0;
    function sonIguales (...args){
        valores = args.map(x=>x.innerHTML);
        if(valores[0] != "" && valores.every((x,i,arr)=>x===arr[0])){
            args.forEach(x=>x.style.backgroundColor= "Fuchsia")
            return true;
        }else{
            return false;
        }
    }
    // comprobamos si hay alguna linea
    if(sonIguales(botones[0], botones[1], botones[2])){
        posicionVIctoria=1;
    }else if (sonIguales(botones[3], botones[4], botones[5])){
        posicionVIctoria=2;
    }else if(sonIguales(botones[6], botones[7], botones[8])){
        posicionVIctoria=3;
    }else if(sonIguales(botones[0], botones[3], botones[6])){
        posicionVIctoria=4;
    }else if(sonIguales(botones[1], botones[4], botones[7])){
        posicionVIctoria=5
    }else if(sonIguales(botones[2], botones[5], botones[8])){
        posicionVIctoria=6
    }else if (sonIguales(botones[0], botones[4], botones[8])){
        posicionVIctoria=7
    }else if (sonIguales(botones[2], botones[4], botones[6])){
        posicionVIctoria=8;
    }

    // Comprobamos quien ha ganado

    if (posicionVIctoria>0){
        if(turno==1){
            nEstado=1;
        }else{
            nEstado=-1;
        }
    }
    return nEstado;
}

function intA(){
    function aleatorio(min, max){
        return Math.floor(Math.random()*(max-min+1))+min;
       
    }
    let valores = botones.map(x=>x.innerHTML);
    let pos =-1;
    
    if (valores[4]==""){
        pos=4
    }else{
        let n = aleatorio(0, botones.length-1);
        while(valores[n]!=""){
            n=aleatorio(0, botones.length-1);
        }
        pos=n;
    }
    botones[pos].innerHTML="O";
    return pos;
}