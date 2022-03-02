window.onload=function(){
    var mas=document.getElementById("mas");
    var texto=document.getElementById("texto");
    function  clickBoton(event){
        console.log("value",event.target.value);
        console.log("value texto",(document.getElementById("texto").value));
    }
    function  presionarTecla(event){
        console.log(event);
    }
    mas.addEventListener("click",clickBoton);
    texto.addEventListener("keyup",presionarTecla);
}
    