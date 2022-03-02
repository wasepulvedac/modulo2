//window.addEventListener("load", async () => {
function validarKeysRut(e){
  let key=e.originalEvent.key;
  console.log("key",key)

  const keys=[ "ArrowDown","ArrowLeft","ArrowUp","ArrowRight","Backspace","Delete"];
  if(keys.indexOf(key)>=0)return true;
  if("0123456789.-kK".indexOf(key)==-1){
    e.preventDefault();
    return false;
  }
  return true;
}
function validarPasteRut(e){
  let data=e.originalEvent.clipboardData.getData("text/plain");
  if(/^[\d][\d]?[\.]?[\d]{3}[\.]?[\d]{0,3}-[\dkK]{1}$/.test(data))return true;
  e.preventDefault();
  return false;
}

$(document).ready(()=>{
  console.log("INIT");
  jQuery.validator.addMethod( "pattern", function( value, element, param ) {
    if ( typeof param === "string" ) {
      param = new RegExp( "^(?:" + param + ")$" );
    }
    return param.test( value );
  }, "Invalid format." );
  jQuery("#frmregistrotrabajo #rut").on('keyup',validarKeysRut);
  jQuery("#frmregistrotrabajo #rut").on('keydown',validarKeysRut);
  jQuery("#frmregistrotrabajo #rut").on('keypress',validarKeysRut);
 // jQuery("#frmregistrotrabajo #rut").on('input',validarRut)
  jQuery("#frmregistrotrabajo #rut").on('paste',validarPasteRut);
  jQuery("input[type=text]").on("change",(e)=>e.target.value=e.target.value.trim())
  jQuery("#frmregistrotrabajo").validate({
    rules: {
      rut: {
        "required":true,
        "pattern":/^[\d][\d]?[\.]?[\d]{3}[\.]?[\d]{0,3}-[\dkK]{1}$/
      },
      nombre:{
        "required":true,
        "pattern":/^[\da-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[\da-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
        "maxlength":30,
        "minlength":3
      },
      apellido:{
        "required":true,
        "pattern":/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
        "maxlength":30,
        "minlength":3
      },
      direccion:{
        "required":true,
        "pattern":/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
        "maxlength":80,
        "minlength":10
      },
      comuna:{
        required:true
      }

    },
    messages: {
      rut: {
        required: "Ingrese su rut",
        pattern: "No es un rut válido.",
        maxlenght:"No puede ingresar más de 12 caracteres",
      },
      nombre: {
        required: "Ingrese su(s) nombre(s)",
        pattern: "No parece un nombre válido",
        maxlenght:"No puede ingresar más de 30 caracteres",
      },
      apellido: {
        required: "Ingrese su(s) apellidos(s)",
        pattern: "No parece un apellido válido",
        maxlenght:"No puede ingresar más de 30 caracteres",
      },
      direccion: {
        required: "Ingrese su dirección",
        pattern: "No parece una dirección válida",
        maxlenght:"No puede ingresar más de 80 caracteres",
        minlenght:"Ingrese por lo menos 10 caracteres",
      },
      comuna: {
        required: "Ingrese su comuna de residencia"
      },
    },
    errorElement: "em",
				errorPlacement: function ( error, element ) {
					// Add the `help-block` class to the error element
					error.addClass( "help-block" );

					// Add `has-feedback` class to the parent div.form-group
					// in order to add icons to inputs
					element.parents( ".col-sm-5" ).addClass( "has-feedback" );

					if ( element.prop( "type" ) === "checkbox" ) {
						error.insertAfter( element.parent( "label" ) );
					} else {
						error.insertAfter( element );
					}

					// Add the span element, if doesn't exists, and apply the icon classes to it.
					if ( !element.next( "span" )[ 0 ] ) {
						$( "<span class='glyphicon glyphicon-remove form-control-feedback'></span>" ).insertAfter( element );
					}
				},
				success: function ( label, element ) {
					// Add the span element, if doesn't exists, and apply the icon classes to it.
					if ( !$( element ).next( "span" )[ 0 ] ) {
						$( "<span class='glyphicon glyphicon-ok form-control-feedback'></span>" ).insertAfter( $( element ) );
					}
				}
  });

  jQuery("#registrotrabajo").on("submit",(e)=>{
    e.preventDefault();
    $("#registrotrabajo").validate();
  });
});

// window.onload = async () => {
//   console.log("Init");
//   const db = openDatabase("autolimpio", "1.0", "Test DB", 2 * 1024 * 1024);
//   console.log("db", db);
//   db.transaction(async (tx) => {
//     tx.executeSql(
//       `CREATE TABLE IF NOT EXISTS Clientes(
//             ID INTEGER PRIMARY KEY,
//             Rut TEXT,
//             Nombre TEXT,
//             Apellido TEXT,
//             Direccion TEXT,
//             Comuna TEXT)`,
//       [],
//       function (tx) {
//         console.log("1", arguments);
//       },
//       null
//     );

//     tx.executeSql(
//       `CREATE TABLE IF NOT EXISTS  Marcas(
//             ID INTEGER PRIMARY KEY,
//             Nombre TEXT)`,
//       [],
//       async function (tx) {},
//       null
//     );

//     tx.executeSql(
//       `CREATE TABLE IF NOT EXISTS  Modelos(
//             ID INTEGER PRIMARY KEY,
//             IDMarca INTEGER,
//             Nombre TEXT)`,
//       [],
//       function (tx) {},
//       null
//     );

//     const marcas = await new Promise((done) => {
//       tx.executeSql(
//         "SELECT * FROM Marcas",
//         [],
//         function (sqlTransaction, sqlResultSet) {
//           var rows = sqlResultSet.rows;
//           var len = rows.length;
//           console.log(rows, len);
//           done(rows, len);
//         }
//       );
//     });
//     console.log("data", marcas);
//     if (marcas.length == 0) {
//       const marcas = await (await fetch("./makes.json")).json();
//       for(let marca of marcas){
//         db.transaction(async (tx1) => {
//           tx1.executeSql("insert into Marcas(id,Nombre) values (?,?)",[marca.id,marca.make]);
//         })
//       }
   
//     }

//     const modelos = await new Promise((done) => {
//       tx.executeSql(
//         "SELECT * FROM Modelos",
//         [],
//         function (sqlTransaction, sqlResultSet) {
//           var rows = sqlResultSet.rows;
//           var len = rows.length;
//           console.log(rows, len);
//           done(rows, len);
//         }
//       );
//     });
//     console.log("data", modelos);
//     if (modelos.length == 0) {
//       const modelos = await (await fetch("./makes.json")).json();
//       for(let modelo of modelos){
//         db.transaction(async (tx1) => {
//           tx1.executeSql("insert into Marcas(id,Nombre) values (?,?)",[marca.id,marca.make]);
//         })
//       }
   
//     }














//   });
//   //});
// };
