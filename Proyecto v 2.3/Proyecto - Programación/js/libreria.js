//MOSTRAR OCULTAR SECCIONES
//Muestra opciones del menu segun tipo de usuario
function mostrarBotones(tipo) {
  $(".btn").hide();
  $("." + tipo).show();
}


function mostrarSeccion() {
  $(".seccion").hide(); //esconde tdodas las div con class=seccion
  let idBtn = $(this).attr("id"); //"trae el id del btn que se toco"
  if (idBtn === undefined) {
    idBtn = "btnSeccionHome";
  }
  let idSeccion = idBtn.charAt(3).toLowerCase() + idBtn.substr(4); //"seccioHome"
  $("#" + idSeccion).show();

  // Valida donde estamos parados para mostrar/ocultar el buscador 
  if (idSeccion === "seccionHome" || idSeccion === "seccionBusqueda") {
    $("#buscador").show();
  } else {
    $("#buscador").hide();
  }
}
//FIN MOSTRAR OCULTAR SECCIONES

// CREAR USUARIOS
function crearUsuario() {
  nombreUsuarioC = $("#txtNombreUsuario").val();
  apellidoUsuarioC = $("#txtApellidoUsuario").val();
  usuarioRol = $("#slcRol").val();
  nombreUsuario = nombreUsuarioC.toLowerCase();
  apellidoUsuario = apellidoUsuarioC.toLowerCase();
  nombreNuevo = nombreUsuario.charAt(0) + apellidoUsuario;
  contrasenaNueva = nombreUsuario.charAt(0) + "-" + apellidoUsuario;
  habilitado = true;
  validador = 0; // Esta variable verifica que se recorrio todo el array sin coincidencias


  if (nombreUsuario === "" || apellidoUsuario === "") {
    //Compruebo que el usuario a crear no sea un campo vacio
    $("#pruebaGestion").html("Ingrese nombre/apellido para poder crear usuario.");
  } else {
    $("#pruebaGestion").empty();
    for (let i = 0; i < iniciarSesionC.length; i++) {

      if (nombreNuevo === iniciarSesionC[i].usuario) {
        ultimaLetra = iniciarSesionC[i].usuario.slice(-1); // Ultimo caracter del usuario indexado comparado
        ultimaLetra = Number(ultimaLetra); // Paso a numero

        // Si el ultimo caracter no era un numero le agrego al nombre ingresado un + 1 como string
        if (isNaN(ultimaLetra)) {
          nombreNuevo = nombreNuevo + "1";
          contrasenaNueva = contrasenaNueva + "1";
        }

        verificarDuplicado(nombreNuevo); //Llamo a la funcion que verificara si hay duplicados
        continuar = verificarDuplicado(); // Creo una variable para guardar el return de la funcion
        //Si verificarDuplicado da true entonces cre un usuario y corto el for
        if (continuar) {
          status = true;
          usuarioNuevo = new Usuario(nombreNuevo, contrasenaNueva, true, usuarioRol, nombreUsuarioC, apellidoUsuarioC,0);
          iniciarSesionC.push(usuarioNuevo);
          break;
        }
      }

      // Si el index llega al final cambio el validado y se crea el usuario por fuera del for 
      if (i === iniciarSesionC.length - 1) {
        validador = 1;
      }
    }
    if (validador === 1) {
      status = true;
      usuarioNuevo = new Usuario(nombreNuevo, contrasenaNueva, true, usuarioRol, nombreUsuarioC, apellidoUsuarioC,0);
      iniciarSesionC.push(usuarioNuevo);
      validador = 0;
    }
    listarUsuarios();
  }
}

//Funcion que verifica que el nombre este creado anteriormente y le agrega el numero correspondiente
function verificarDuplicado(nombre) {
  nombreValidado = false; // la funcion empieza retornando false
  for (let i = 0; i < iniciarSesionC.length; i++) {
    if (nombre === iniciarSesionC[i].usuario) {
      ultimaLetra = iniciarSesionC[i].usuario.slice(-1); // corto el ultimo caracter del usuario indexado comparado
      ultimaLetra = Number(ultimaLetra); // paso caracter a numero
      if (ultimaLetra >= 1) {
        ultimaLetra = ultimaLetra + 1; // le sumo a la ultima letra
        ultimaLetra = ultimaLetra.toString(); // lo regreso a string
        contrasenaNueva = contrasenaNueva.substring(0, contrasenaNueva.length - 1) + ultimaLetra;
        nombreNuevo = nombre.substring(0, nombre.length - 1) + ultimaLetra; //Borro el ultimo caracter del nombre traido de la funcion crear usuario con un substring y le agrego el nuevo ultimo caracter
      }
      //Verifico que llegue al final y devuelvo true
      if (i === iniciarSesionC.length - 1) {
        nombreValidado = true;
      }
    }
  }
  return (nombreValidado);
}
//FIN CREAR USUARIOS

//LISTAR USUARIOS
function listarUsuarios() {
  $("#tblGestion").empty();
  for (let i = 0; i < iniciarSesionC.length; i++) {
    if (iniciarSesionC[i].habilitado === true) {
      mostrarTxtBoton = `<td><input type="button" id="${iniciarSesionC[i].usuario}" class="btnCondicion" value="Deshabilitar" > </td>`;
    } else {
      mostrarTxtBoton = `<td><input type="button" id="${iniciarSesionC[i].usuario}" class="btnCondicion" value="Habilitar" > </td>`;
    }
    $("#tblGestion").append(`<tr>
      <td>${iniciarSesionC[i].usuario}</td>
      <td>${iniciarSesionC[i].contrasena}</td>
      ${mostrarTxtBoton}
      <td>${iniciarSesionC[i].recetas}</td>
      <td>${iniciarSesionC[i].rol}</td>
      </tr>`);
  }
  $(".btnCondicion").click(switchCondicion);
  listarRecetasInicio();
}
// FIN LISTAR USUARIOS



//SWITCH HABILITAR/DESHABILITAR

function switchCondicion() {
  let idBtn = $(this).attr("value");
  let idBtnUser = $(this).attr("id");

  for (let i = 0; i < iniciarSesionC.length; i++) {
    if (iniciarSesionC[i].usuario === idBtnUser) {
      posicionId = i;
    }
  }


  if (idBtn === "Habilitar") {
    iniciarSesionC[posicionId].habilitado = true;
    $("#" + idBtnUser).attr("value", "Deshabilitar");


    for (let j = 0; j < recetasPublicadas.length; j++) {
      if (recetasPublicadas[j].idAutor === iniciarSesionC[posicionId].usuario) {
        recetasPublicadas[j].mostrar = true;
      }
    }
  }

  if (idBtn === "Deshabilitar") {
   
    iniciarSesionC[posicionId].habilitado = false;
    $("#" + idBtnUser).attr("value", "Habilitar");

    for (let j = 0; j < recetasPublicadas.length; j++) {
      if (recetasPublicadas[j].idAutor === iniciarSesionC[posicionId].usuario) {
        recetasPublicadas[j].mostrar = false;
      }
    }
  }

  listarRecetasInicio();
}
// FIN SWITCH

// INICIO SESION
//Trae datos html
function iniciarSesionCampo() {
  $("#txtUsuario").empty();
  $("#txtContrasena").empty();
  usuarioCampo = $("#txtUsuario").val();
  contrasenaCampo = $("#txtContrasena").val();
  let resultado = iniciarSesion(usuarioCampo, contrasenaCampo)
  if (resultado === "admin" || resultado === "colaborador") {
    $("#pruebaIS").html("Bienvenido/a " + resultado);
  } else {
    $("#pruebaIS").html(resultado);
  }

  if (someUserOn === false) {
    mostrarBotones("user");
  } else {
    mostrarBotones(resultado);
    mostrarSeccion();
  }
}


//Funcion iniciar sesion 
function iniciarSesion(usuarioC, contrasenaC) {

  for (let i = 0; i < iniciarSesionC.length; i++) {
    if (iniciarSesionC[i].usuario === usuarioC && iniciarSesionC[i].habilitado === false) {
      estado = "El usuario no esta hablitado temporalmente";
      break;
    } else {
      if (iniciarSesionC[i].usuario === usuarioC && iniciarSesionC[i].contrasena === contrasenaC) {
        tipoUsuario = iniciarSesionC[i].rol;
        estado = tipoUsuario;
        onUser = i;
        someUserOn = true;
        infoUserOn(i);
        break;
      } else if (iniciarSesionC[i].usuario === usuarioC && iniciarSesionC[i].contrasena !== contrasenaC) {
        estado = "La contraseña es incorrecta, vuelve a ingresarla.";
        break;
      } else if (iniciarSesionC[i].usuario !== usuarioC && iniciarSesionC[i].contrasena === contrasenaC) {
        estado = "El usuario ingresado es incorrecto, por favor, verifique.";
        break;
      } else if (iniciarSesionC[i].usuario !== usuarioC && iniciarSesionC[i].contrasena !== contrasenaC) {
        estado = "El usuario/contraseña no existe, por favor, verifique.";
      }
    }
  }
  return estado;
} //Fin Funcion iniciar sesion

//Publicar Receta
function datosPublicarReceta() {

  //Obtengo datos de html
  tituloReceta = $("#txtTitulo").val();
  $("#txtTitulo").val("");
  tiempoReceta = Math.abs(Number($("#txtTiempoReceta").val()));
  $("#txtTiempoReceta").val("");
  elaboracionReceta = $("#txtElaboracion").val();
  $("#txtElaboracion").val("");
  idFoto = $("#imgRecetas").val();
  $("#imgRecetas").val("");
  //Para conseguir el autor, cuando un usuario se loguea, me deja en una 
  //variable su posicion (onUser)
  autorReceta = iniciarSesionC[onUser].nombre + " " + iniciarSesionC[onUser].apellido;
  contadorRecetasUsuario = iniciarSesionC[onUser].recetas;
  contadorRecetasUsuario++
  iniciarSesionC[onUser].recetas = contadorRecetasUsuario;
  idAutorReceta = iniciarSesionC[onUser].usuario;
  rolAutorReceta = iniciarSesionC[onUser].rol;
  nombreReceta = idFoto.substr(idFoto.lastIndexOf("\\") + 1);
  fotoReceta = `<img src="img/${nombreReceta}"></img>`;
  if (tituloReceta === "" || idFoto === "" || elaboracionReceta === "" || tiempoReceta === 0) {
    alert("Se necesitan todos los campos para publicar");
  } else {
    idContadorRecetasPublicadas++;
    recetaNueva = new Receta(idContadorRecetasPublicadas, autorReceta, idAutorReceta, rolAutorReceta, tituloReceta, tiempoReceta, elaboracionReceta, fotoReceta,true,0,0,0);
    recetasPublicadas.push(recetaNueva);
    $("#pruebaPublicar").html("Receta publicada");

  }
  listarRecetasInicio();
  listarUsuarios();
  reporteDuracionMaxima();
  reporteRendimiento();

}

//Funcion para publicar las funciones al inicio. 
function listarRecetasInicio() {
  $("#seccionHome").empty();
  $("#seccionHome").append(`<h3>Recetas Publicadas</h3>`);
  if (idContadorRecetasPublicadas === 0) {
    $("#seccionHome").append(`<div><p> Aun no se han publicado recetas.</p></div>`)
  }
  // For para listar primero las recetas del admin  
  for (let i = 0; i < recetasPublicadas.length; i++) {
    if (recetasPublicadas[i].mostrar === true && recetasPublicadas[i].rolAutor === "admin") {
      $("#seccionHome").append(`<div>
      <h2>${recetasPublicadas[i].titulo}</h2>
      <h4>${recetasPublicadas[i].autor}</h4>
      ${recetasPublicadas[i].imagen}
      <p><strong>${recetasPublicadas[i].tiempo}</strong> minutos</p>
      <p>${recetasPublicadas[i].elaboracion}</p>
      <span id="rendimientoPositivo" class="contadorRendimiento">${recetasPublicadas[i].meGusta}</span><a class="btnRendimiento" data-valor="Like" data-receta="${i}"> <span class="icon-thumbs-up"></span></a>
      <a class="btnRendimiento" data-valor="Dislike" data-receta="${i}"> <span class="icon-thumbs-down"></span></a><span class="contadorRendimiento">${recetasPublicadas[i].noMeGusta}</span>
      </div>
      <hr>`);
    }

  }

  // For para listar despues las recetas de los colaboradores
  for (let j = 0; j < recetasPublicadas.length; j++) {
    if (recetasPublicadas[j].mostrar === true && recetasPublicadas[j].rolAutor === "colaborador") {
      $("#seccionHome").append(`<div>
    <h2>${recetasPublicadas[j].titulo}</h2>
    <h4>${recetasPublicadas[j].autor}</h4>
    ${recetasPublicadas[j].imagen}
    <p><strong>${recetasPublicadas[j].tiempo}</strong> minutos</p>
    <p>${recetasPublicadas[j].elaboracion}</p>
    <span id="rendimientoPositivo" class="contadorRendimiento">${recetasPublicadas[j].meGusta}</span><a class="btnRendimiento" data-valor="Like" data-receta="${j}"> <span class="icon-thumbs-up"></span></a>
      <a class="btnRendimiento" data-valor="Dislike" data-receta="${j}"> <span class="icon-thumbs-down"></span></a><span class="contadorRendimiento">${recetasPublicadas[j].noMeGusta}</span>
    </div>
    <hr>`);
    }

  }
  $(".btnRendimiento").click(rendimientoReceta);
}

//Verifica si existen recetas publicadas, si no es asi
function verificarListaReceta() {
  if (idContadorRecetasPublicadas === 0) {
    $("#seccionHome").append(`<div><p> Aun no se han publicado recetas.</p></div>`)
  } else {
    listarRecetasInicio();
  }
}//Fin Publica Receta



//MODIFICACION BOTON LOGIN/LOGOUT
// Funcion que cambia el boton de login/logout
function infoUserOn(userInfo) {
  if (someUserOn === true) {
    $("#btnSeccionLogin").html(`Logout`);
    $("#onUserName").html(`Bienvenido: ${iniciarSesionC[userInfo].nombre} ${iniciarSesionC[userInfo].apellido} `);
  }
} // FIN MODIFIACION BOTON


//LOGOUT
function logout() {
  if (someUserOn === true) {
    $("#btnSeccionLogin").html(`Login`); //Cambiamos el texto del menu
    $("#onUserName").html(` `);
    someUserOn = false; //No hay user on
    mostrarBotones("user"); //Modificamos el menu 
  }

}// FIN LOGOUT

function hideReport(idReporte) {
  $(".reporte").hide()
}

function listarReporte() {
  hideReport()
  if ($("#chkTiempo").is(":checked")) {
    $("#tblTiempo").show();
    reporteTiempoIngresado();
  }

  if ($("#chkDuracion").is(":checked")) {
    $("#tblDuracion").show();
    reporteDuracionMaxima()
  }


  if ($("#chkRendimiento").is(":checked")) {
    reporteRendimiento();  
    $("#tblRendimiento").show();
   
  }

}

function inputEnabled() {
  if ($("#chkTiempo").is(":checked")) {
    $("#numReporteTiempo").prop("disabled", false);
  } else {
    $("#numReporteTiempo").prop("disabled", true);
  }
}


//Buscar Receta
//Buscador
function tomarDatosBusqueda() {
  //tomo el valor ingresado por el usuario para la búsqueda y luego lo paso a minúscula:
  let textoBusqueda = $("#txtBusqueda").val();
  let textoBusquedaMin = textoBusqueda.toLowerCase();
  //creo una variable que guarda el valor devuelto por la función (el texto sin tildes):
  let txtBusquedaMinSinTildes = eliminarTildes(textoBusquedaMin);

  let resultado1 = buscarReceta(txtBusquedaMinSinTildes);
  if (!resultado1) {
    let resultado2 = buscarReceta2(txtBusquedaMinSinTildes);
    if (!resultado2 || textoBusqueda === "") {
      $("#seccionBusqueda").html("No hay resultados que coincidan con la búsqueda.")
    }
  }
}
//Creo la función para buscar por ELABORACIÓN:
function buscarReceta2(texto) {
  let encontrada2 = false;
  $("#seccionBusqueda").empty();
  $("#seccionBusqueda").append(`<div>Resultado de la busqueda:</div>`);
  //Recorro el array de recetasPublicadas y verifico si es subcadena, si lo es, muestro el resultado:
  for (let i = 0; i < recetasPublicadas.length; i++) {
    if(texto === ""){
      break;
    }

    let elaboracionMin = recetasPublicadas[i].elaboracion.toLowerCase();
    let elaboracionMinSinTildes = eliminarTildes(elaboracionMin);
    let verificarSubcadena2 = esSubcadena(elaboracionMinSinTildes, texto);
    if (verificarSubcadena2) {
      encontrada2 = true;
      $("#seccionBusqueda").append(`<div>
          <h2>${recetasPublicadas[i].titulo}</h2>
          <h4>${recetasPublicadas[i].autor}</h4>
          ${recetasPublicadas[i].imagen}
          <p><strong>${recetasPublicadas[i].tiempo}</strong> minutos</p>
          <p>${recetasPublicadas[i].elaboracion}</p></div>`);
    }
  }
  return encontrada2;
}

//creo la función para buscar recetas según el título:
function buscarReceta(texto) {
  let encontrada1 = false;
  $("#seccionBusqueda").empty();
  $("#seccionBusqueda").append(`<div>Resultado de la busqueda:</div>`);
  //recorro el array 
  for (let i = 0; i < recetasPublicadas.length; i++) {
    if(texto === ""){
      break;
    }
    
    //paso a minúscula el titulo, y le elimino los tildes:
    let tituloMin = recetasPublicadas[i].titulo.toLowerCase();
    let tituloMinSinTildes = eliminarTildes(tituloMin);
    //comparo los textos, si coinciden exactamente, muestro la receta:
    if (tituloMinSinTildes === texto) {
      encontrada1 = true;
      $("#seccionBusqueda").append(`<div>
          <h2>${recetasPublicadas[i].titulo}</h2>
          <h4>${recetasPublicadas[i].autor}</h4>
          ${recetasPublicadas[i].imagen}
          <p><strong>${recetasPublicadas[i].tiempo}</strong> minutos</p>
          <p>${recetasPublicadas[i].elaboracion}</p></div>`);
      //sino, verifico si es subcadena del título. Si lo es, muestro el/los resultados:
    } else {
      let verificarSubcadena1 = esSubcadena(tituloMinSinTildes, texto);
      if (verificarSubcadena1) {
        encontrada1 = true;
        $("#seccionBusqueda").append(`<div>
              <h2>${recetasPublicadas[i].titulo}</h2>
              <h4>${recetasPublicadas[i].autor}</h4>
              ${recetasPublicadas[i].imagen}
              <p><strong>${recetasPublicadas[i].tiempo}</strong> minutos</p>
              <p>${recetasPublicadas[i].elaboracion}</p></div>`);
      }
    }
  }
  return encontrada1;
}

//Creo la función para verificar si un texto es subcadena de otro:
function esSubcadena(textoCompleto, textoParcial) {
  let resultado = false;
  let consultarSubcadena = textoCompleto.indexOf(textoParcial);
  if (consultarSubcadena >= 0) {
    resultado = true;
  }
  return resultado;

}

//Creo la función para eliminar los tildes:
function eliminarTildes(texto) {
  let textoNuevo = "";
  for (let i = 0; i < texto.length; i++) {
    if (texto.charAt(i) === "á") {
      textoNuevo += "a";
    } else if (texto.charAt(i) === "é") {
      textoNuevo += "e";
    } else if (texto.charAt(i) === "í") {
      textoNuevo += "i";
    } else if (texto.charAt(i) === "ó") {
      textoNuevo += "o";
    } else if (texto.charAt(i) === "ú") {
      textoNuevo += "u";
    } else {
      textoNuevo += texto.charAt(i);
    }
  }
  return textoNuevo;

}
//Fin buscador


//Reporte

function reporteTiempoIngresado(){
  tiempoIngresado = $("#numReporteTiempo").val();
  contadorHastaTiempoIngresado = 0;
  contadorMasTiempoIngresado = 0;
  for(let i = 0; i < recetasPublicadas.length; i++){
    if (recetasPublicadas[i].mostrar === true) {
      if (recetasPublicadas[i].tiempo <= tiempoIngresado) {
        contadorHastaTiempoIngresado++;
      } else {
        contadorMasTiempoIngresado++;
      }
    }
  }
  $("#resultadoTiempo").html(`La cantidad de recetas hasta el tiempo indicado es de: ${contadorHastaTiempoIngresado}.`);
  $("#resultadoMasTiempo").html(`La cantidad de recetas con mas del tiempo indicado es de: ${contadorMasTiempoIngresado}.`);
}



function reporteDuracionMaxima(){
recetasPublicadas.sort(
    function(prev,next){
    return next.tiempo - prev.tiempo;
    })
    $("#tblReporteDuracion").empty();
    for(let i = 0; i < recetasPublicadas.length; i++){
      if(recetasPublicadas[i].mostrar === true){
        $("#tblReporteDuracion").append(`<tr>
        <td>${recetasPublicadas[i].titulo}</td>
        <td>${recetasPublicadas[i].autor}</td>
        <td>${recetasPublicadas[i].tiempo}</td>        
      </tr>`);
      }

    }
    listarRecetasInicio();
}


function reporteRendimiento(){
  recetasPublicadas.sort(
      function(prev,next){
      return next.rendimiento - prev.rendimiento;
      })
      $("#tblReporteRendimiento").empty();

      for(let i = 0; i < recetasPublicadas.length; i++){
        if((recetasPublicadas[i].meGusta > 0 || recetasPublicadas[i].noMeGusta > 0) && recetasPublicadas[i].mostrar === true){
          $("#tblReporteRendimiento").append(`<tr>
          <td>${recetasPublicadas[i].titulo}</td>
          <td>${recetasPublicadas[i].autor}</td>
          <td>${recetasPublicadas[i].meGusta}</td>        
          <td>${recetasPublicadas[i].noMeGusta}</td>
        </tr>`);
        }

      }
      listarRecetasInicio();
}//FIN Reporte

//Me gusta / No me gusta Recetas
function rendimientoReceta() {
  idBtnLike = $(this).attr("data-receta");
  btnType = $(this).attr("data-valor");

  if (btnType === "Like") {
    recetasPublicadas[idBtnLike].meGusta = recetasPublicadas[idBtnLike].meGusta + 1;
  }

  if (btnType === "Dislike") {
    recetasPublicadas[idBtnLike].noMeGusta = recetasPublicadas[idBtnLike].noMeGusta + 1;
  }
  listarRecetasInicio();

  recetasPublicadas[idBtnLike].rendimiento = (recetasPublicadas[idBtnLike].meGusta / (recetasPublicadas[idBtnLike].noMeGusta + recetasPublicadas[idBtnLike].meGusta))*100;
}//FIN Me gusta / No me gusta Recetas

