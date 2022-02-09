//Array(10000).fill(0)  --> crea un arreglo de largo 100000 y lo llena con 0
//.map((it,ind)=>Math.round((Math.random()*2)-1))   -> Math.random genera un n° entre 0 y 1 , x2 y -1 es para que el resultado este entre -1 y 1 y con Math.round lo redondea al entero mas cercano
//.reduce transforma el arreglo en un solo resultado, en este caso un objeto
function init(puntos) {
  const AlturaMinima=2;
  const npuntos = Array(puntos)
    .fill(0)
    .map((it, ind) => Math.round(Math.random() * 2 - 1));
  const resultado = npuntos.reduce(
    (acumulado, elementoActual, index) => {
      acumulado.contTemp += elementoActual; //Voy sumando la altura
      if(acumulado.contTemp===0){
        acumulado.ultimoCero=index;
      }

      if (acumulado.minAltura > acumulado.contTemp) {
        acumulado.minAltura = acumulado.contTemp;
      }

      if (acumulado.contTemp >= AlturaMinima && !acumulado.cerroNuevo) {
        // Si pasa la altura de 3 Y cerroNuevo es falso
        acumulado.cerroNuevo = true; //creo un nuevo cerro
        acumulado.contCerros++; //actualizo el contador
        acumulado.index = index;
      }
      if (
        acumulado.cerroNuevo &&
        acumulado.contTemp > acumulado.maxAlturaCerro
      ) {
        //si la altura acumulada es mayor a  la altura maxima , la actualizo
        acumulado.maxAlturaCerro = acumulado.contTemp;
      }
      if (acumulado.cerroNuevo && acumulado.contTemp == 0) {
        //si encontre un cerro pero llego la altura a 0
        acumulado.lstCerro.push({
          altura: acumulado.maxAlturaCerro,
          inicio: acumulado.index,
          final: index,
        }); //lo guardo en el arreglo
        acumulado.contTemp = 0;
        acumulado.maxAlturaCerro = 0; //Vuelvo la altura maxima a 0
        acumulado.cerroNuevo = false; //Para comenzar  a buscar un nuevo cerro
      }
      return acumulado; //Aqui se van guardando los resultados intermedios
    },
    {
      contCerros: 0,
      contTemp: 0,
      cerroNuevo: false,
      lstCerro: [],
      maxAlturaCerro: 0,
      minAltura: 0,
      maxAltura: 0,
      index: 0,
    } //<--valor inicial con el que comienza reduce
    //contCerros cantidad de cerros que aparecen, esta definido x cualquier suma de numeros que pasen de 3
    //contTemp, voy guardando la altura acumulada hasta el momento
    //cerroNuevo, indica que estoy enun cerro y mientras no llegue a 0 de nuevo, no va a considerar otro cerro
    //lstCerro : voy a guardar la altura maxima de los cerros que vaya encontrando
    //maxAltura: si encuento un cerro, va a ser la maxima altura a la que llegó
  );
  if (resultado.cerroNuevo) {
    //si es true, quiere decir que quedo un cerro a medias, por lo que hay que guardarlo
    resultado.lstCerro.push({ altura: resultado.maxAlturaCerro });
  }
  resultado.maxAltura = Math.max(resultado.lstCerro.map((i) => i.altura));
  console.log("Cerros encontrados", resultado.contCerros);
  console.log("Alturas de los cerros");
  console.table(resultado.lstCerro);
  document
    .getElementById("fila")
    .querySelectorAll("td")
    .forEach((i) => document.getElementById("fila").removeChild(i));

  resultado.lstCerro.forEach((i) => {
    //const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.textContent = i.altura;
    //tr.appendChild(td);
    document.getElementById("fila").appendChild(td);
  });
  document.getElementById("ncerros").textContent = resultado.contCerros;

  if (resultado.lstCerro.length > 0) {
    let inicio=0;
    let tmp=[]
    for (let cerro of resultado.lstCerro) {

      tmp.push(npuntos.slice(inicio,cerro.inicio).join(''));
      tmp.push(`<span class="cerro" title="${cerro.altura}">`+npuntos.slice(cerro.inicio,cerro.final).join('')+'</span>');
    }
    tmp.push(npuntos.slice(resultado.lstCerro.at(-1).final).join(''));
    document.getElementById("resultado").innerHTML = tmp.join("");

  } else document.getElementById("resultado").textContent = npuntos.join("");

  /*  var canvas = document.getElementById('canvas');
  const alto=resultado.maxAltura+Math.abs(resultado.minAltura);
  //canvas.setAttribute("width",npuntos.length);
  //canvas.setAttribute("heigth",Math.max(resultado.lstCerro.map(i=>i.altura))+Math.abs(resultado.minAltura));
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    canvas.width=npuntos.length;
    canvas.height=alto;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.translate(0,resultado.minAltura)
    ctx.beginPath();
    ctx.lineTo(npuntos.length,0)
    let acumAltura=0;
    for (let index = 0; index < npuntos.length; index++) {
        const element = npuntos[index];
        acumAltura+=element;
        ctx.lineTo(index,-1*acumAltura);
        ctx.stroke();
        
    // }
    ctx.closePath();
  } */
}

document.getElementById("ejecutar").addEventListener("click", (event) => {
  const puntos = +document.getElementById("npuntos").value;
  console.log("npuntos", puntos);
  init(puntos);
});
