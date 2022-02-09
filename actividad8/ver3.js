let patron=[1,1,-1,-1,0,0,0,0,1,-1,1,1,-1,-1];
let sumaAltura=0;
let i=0;
let listaAltura=[];
while(i<patron.length){

    sumaAltura+=patron[i];
    console.log("suma",sumaAltura);
    listaAltura.push(sumaAltura);//Aquilos voy guardando
    i++;
}
console.log("patron");
console.table(patron);
console.log("lista alturas");
console.table(listaAltura);