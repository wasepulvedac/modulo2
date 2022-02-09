const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
function generarPuntos(lstPuntos) {
  let contCerros = 0;
  let alturaTemporal = 0;
  let cerroNuevo = false;
  let alertaInicioCerro = false;
  let alertaFinCerro = false;
  console.log("Inicio loop");
  console.table(lstPuntos);
  let lstCerros = [];
  let inicioCerro = 0;
  for (let index = 0; index < lstPuntos.length; index++) {
    const elementoActual = lstPuntos[index];
    if (elementoActual == 0) continue;
    if (cerroNuevo) {
      if (alertaFinCerro) {
        if (elementoActual === 1) {
          //ok
          alertaFinCerro = false;
          alturaTemporal += elementoActual;
          continue;
        } else if (elementoActual === -1) {
          //Termino de cerro
          lstCerros.push({
            inicio: inicioCerro,
            fin: index,
            altura: alturaTemporal,
          });
          alturaTemporal = 0;
          cerroNuevo = false;
          alertaInicioCerro = false;
          alertaFinCerro = false;
          continue;
        }
      } else {
        if (elementoActual === 1) {
          //ok
          alturaTemporal += elementoActual;
          continue;
        } else if (elementoActual === -1) {
          //ok
          alturaTemporal += elementoActual;
          alertaFinCerro = true;
          continue;
        }
      }
    } else {
      if (alertaInicioCerro) {
        //Ingreso un nuevo cerro
        if (elementoActual === 1) {
          contCerros++;
          cerroNuevo = true;
          alturaTemporal += elementoActual;
          continue;
        } else if (elementoActual === -1) {
          alertaInicioCerro = false;
          alturaTemporal = 0;
          continue;
        }
      } else {
        //ok
        if (elementoActual === 1) {
          inicioCerro = index;
          alertaInicioCerro = true;
          alturaTemporal = elementoActual;
          continue;
        } else if (elementoActual === -1) {
          alertaInicioCerro = false;
          alturaTemporal = 0;
          continue;
        }
      }
    }
    console.log("FAIL");
  }
  if (cerroNuevo) {
    lstCerros.push({
      inicio: inicioCerro,
      fin: lstPuntos.length,
      altura: alturaTemporal,
    });
  }

  console.log("contCerros", contCerros);
  console.log(lstCerros);
  return { contCerros, lstCerros };
}
function getMaxMin(puntos) {
  return puntos.reduce(
    (a, b) => {
      a.acum += b;
      if (a.acum < a.min) a.min = a.acum;
      if (a.acum > a.max) a.max = a.acum;
      return a;
    },
    { max: 0, min: 0, acum: 0 }
  );
}
function drawGrid(ctx, dx, dy, x, y, width, height) {
  //horizontal
  for (let index = -x; index < x; index++) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "Yellow";
    ctx.moveTo(0, index * dy);
    ctx.lineTo(width, index * dy);
    console.log(0, index * dy, width, index * dy);
    ctx.stroke();
  }
  //vertical
  for (let index = 0; index < y; index++) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "Green";
    ctx.moveTo(index * dx, 0);
    ctx.lineTo(index * dx, height);
    ctx.stroke();
  }
}

async function dibujarPuntos(_puntos, cerros) {
  const Green = "#00ff00";
  const Blue = "#0000ff";
  let puntos = [];
  let acum = 0;
  for (let index = 0; index < _puntos.length; index++) {
    acum += _puntos[index];
    puntos[index] = acum;
  }

  const info = getMaxMin(puntos);
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    ctx.closePath();
    ctx.font = "20px Calibri";

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // ctx.width=canvas.clientWidth;
    // ctx.height=canvas.clientHeight;

    const maxHeight = Math.max(info.max, Math.abs(info.min));
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const { width, height } = canvas;
    const dx = Math.round((width - 20) / puntos.length);
    const dy = Math.round(((height - 20) / maxHeight) * 2);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.translate(10, height / 2);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(10, 0);
    ctx.lineTo(dx * puntos.length - 20, 0);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "Black";
    ctx.stroke();

    for (let z = 0; z < puntos.length; z++) {
      ctx.beginPath();
      ctx.moveTo(z * dx + 10, 5);
      ctx.lineTo(z * dx + 10, -5);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "Black";
      ctx.stroke();
      ctx.fillText(z, z * dx + 5, 15);
    }

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = Blue;
    ctx.moveTo(10, 0);
    //Dibujo grafico
    for (let index = 0; index < puntos.length; index++) {
      const punto = puntos[index];
      if (index > 0) {
        ctx.lineTo(10 + dx * index, -dy * puntos[index - 1]);
      }

      if (
        cerros.filter((cerro) => {
          return index >= cerro.inicio && index <= cerro.fin;
        }).length > 0
      ) {
        if (ctx.strokeStyle == Blue) {
          console.log("Cambio a verde");
          ctx.lineTo(10 + dx * index, -dy * punto);
          ctx.stroke();

          ctx.beginPath();
          ctx.strokeStyle = Green;
        }
      } else {
        if (ctx.strokeStyle == Green) {
          console.log("Cambio a azul");
          ctx.lineTo(10 + dx * index, -dy * punto);
          ctx.stroke();

          ctx.beginPath();
          ctx.strokeStyle = "Blue";
        }
      }

      ctx.lineTo(10 + dx * index, -dy * punto);
      ctx.stroke();
      await sleep(500);
    }
    ctx.stroke();
  }
}
function getRandomInt(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
async function ejecutarClick(event){
    event.target.disabled=true;
  //ejecutar.removeEventListener("click", ejecutarClick);
  //ejecutar.setAttribute("disabled", "disabled");
  const npuntos = +document.getElementById("npuntos").value;
  if (npuntos > 10) {
    const lstPuntos = Array(npuntos)
      .fill(0)
      .map((it, ind) => getRandomInt(1, -1));
    const info = getMaxMin(lstPuntos);
    console.log(lstPuntos);
    console.log(info);
    const { contCerros, lstCerros } = generarPuntos(lstPuntos);
    document.getElementById("puntos").textContent = lstPuntos.join(" , ");
    document.getElementById("ncerros").textContent = contCerros;
    await dibujarPuntos(lstPuntos, lstCerros);


    //ejecutar.removeAttribute("disabled");
    event.target.disabled=false;
    //ejecutar.addEventListener("click", ejecutarClick);
  }
}
if (globalThis.Window && globalThis.document) {
  const ejecutar = document.getElementById("ejecutar");
  ejecutar.addEventListener("click", ejecutarClick);
}

const lstPuntos = Array(40).fill(0).map((it, ind) => getRandomInt(1, -1));
generarPuntos(lstPuntos);
