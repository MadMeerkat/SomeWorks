//MAIL VALIDO: random1@correo.com abc12345
// VARIABLES GLOBALES
const urlFija = "http://ec2-54-210-28-85.compute-1.amazonaws.com:3000/api/";
let onUser;
let spinnerModal;
let pruebas;
let mymap;
let posUsuario = {
    latitud: -32.898038, longitud: -55.805054
}
let sucursales;
let codigoProducto;
//let inputComentario;
let listadoUsuarioFavoritas;
let favoritasUsuarioConectado = [];
let textoScanner;
let listaProductos = [];
let arrayFiltroEtiqueta = [];

/*--------------- LOGIN ------------------*/

function validarLogin(email, password) {
    let retorno = true;

    if (email == "" || password == "") {
        retorno = false;
        mensaje = "UPS!, Hay algun campo vacio.";
        showAlert(mensaje, "#loginDiv", 1);
        console.log("El usuario dejo algun campo de login vacio");
    }
    return retorno;
}

/* ------------- FIN LOGIN -------------- */

/* ----------- REGISTRO -------------- */
function validarRegistro(n, a, d, np, e, p) {
    let retorno = true;

    if (n === "" || a === "" || d === "" || e === "" || p === "") {
        retorno = false;
        mensaje = "Ups!, alguno de los campos obligatorios quedo vacio."
    } else if (!validarEmail(e)) {
        retorno = false;
        mensaje = "Ups!, el email no tiene un formato valido"
    } else if (!validarPassRegistro(p)) {
        retorno = false;
        mensaje = "Ups!, la password no cumple los requisitos minimos"
    } else if (!validarDireccion(d, np)) {
        retorno = false;
        mensaje = "Ups!, la direccion no tiene el formato valido.";
    }

    if (retorno == false) {
        showAlert(mensaje, "#registerDiv", 1);
        console.log("Error en registro: " + mensaje)
    }

    return retorno;
}

function validarEmail(e) {
    let retorno = false;
    emailRegular = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (emailRegular.test(e)) {
        console.log("Email Ok");
        retorno = true;
    }
    return retorno;
}

function validarPassRegistro(p) {
    let retorno = false;
    if (p.length >= 8) {
        retorno = true;
    }
    return retorno;
}

function validarDireccion(d, np) {
    let validarCalle = false;
    let validarPuerta = false;
    let retorno = false;
    if (d.length >= 3) {
        validarCalle = true;
    }
    if (np > 9) {
        validarPuerta = true;
    }

    if (validarPuerta && validarCalle) {
        retorno = true;
    }
    return retorno;
}
/* ------------- FIN REGISTRO -------------- */


/*--------------- CATALOGO ------------------ */
function armarCatalogo(productos) {
    let listadoHtml = "";
    let color;
    let etiquetasHtml = `<span class="tagsicon"><ons-icon  icon="fa-tags" class="list-item__icon"></ons-icon></span>`;
    for (let i = 0; i < productos.length; i++) {
        let k =0;
        let p = productos[i];
        let etiquetasHtml = `<span class="tagsicon"><ons-icon  icon="fa-tags" class="list-item__icon"></ons-icon></span>`;
        if (favoritasUsuarioConectado.indexOf(p._id) === -1) {
            color = "#838383";
        } else {
            color = "red";
        }


        for(let j = 0; j < p.etiquetas.length; j++){
            let e = p.etiquetas[j];
            k =  k+1;

            if(k < 4){
                etiquetasHtml += 
                `<span class="etiquetaSpan" onclick="filtroEtiqueta('${e}')" >${e}</span>`;
            }else{
                etiquetasHtml += 
                `<span class="etiquetaSpan" onclick="filtroEtiqueta('${e}')" >${e}</span> </br>`;
                k=0;
            }

        }

        if(p.estado != "en stock"){
            stockColor = "#de2222";
        }else{
            stockColor = "#43af69";
        }

        listadoHtml +=
            `<ons-list-item tappable>
          <div class="product-card">
          <img class="imgNotFound"  src='http://ec2-54-210-28-85.compute-1.amazonaws.com:3000/assets/imgs/${p.urlImagen}.jpg' onerror="this.src='img/no-image.png'" onclick="irDetalleCatalogo('${p._id}')">
            <p class="list-item__title pCodigo">${p.codigo} <span style="color:${color}" id="fav${p._id}" onclick="favReceta('${p._id}')"><ons-icon  icon="md-favorite" class="list-item__icon md-favorite" ></ons-icon></span></p>
            <p class="list-item__title pNombre" onclick="irDetalleCatalogo('${p._id}')">${p.nombre}</p>
            <p class="list-item__title pPrice"><span><ons-icon  icon="fa-dollar-sign" class="list-item__icon"></ons-icon></span>${p.precio}</p>
            <p class="list-item__subtitle pStock" style="color:${stockColor}">${p.estado}</p>
            <p class="list-item__subtitle pStock">${etiquetasHtml}</p>
          </div>
        </ons-list-item>`
    }
    $('#listDiv').html(listadoHtml);

}

function filtroEtiqueta(e){
    arrayFiltroEtiqueta = [];

    for(let i = 0; i < listaProductos.length; i++){
        let eti = listaProductos[i].etiquetas;
        console.log(listaProductos[i])
        
        for(let j = 0; j < eti.length; j++){
            if(e === eti[j]){
                console.log(listaProductos[i]);
                arrayFiltroEtiqueta.push(listaProductos[i])
            }
        }
    }

    armarCatalogo(arrayFiltroEtiqueta)
}

function irDetalleCatalogo(idProducto) {
    myNavigator.pushPage('detalleProducto.html', { data: { _id: idProducto } });
}

function calcularPrecio(precio) {
    let cantidad = $("#can").val();
    precioFinal = cantidad * precio;
    $("#resultadoCalcular").html(`Total: <span><ons-icon icon="fa-dollar-sign" class="list-item__icon"></ons-icon></span>` + precioFinal)

}

function compraProducto(producto) {
    codigoProducto = producto._id;

    if(producto.estado != "en stock"){
        $('#divComprar').html(
            `
            <p id="estiloPrecio">
                <span id="canPrecio"><ons-input type="number" id="can" placeholder="Cantidad"> </ons-input></span>
                <ons-button id="calcular" onclick="calcularPrecio(${producto.precio})">Calcular</ons-button>
            </p>
            <p id="resultadoCalcular">
            </p>
    
            <ons-select id="sucOpcion">
            </ons-select>
               
            <p>
            <ons-button id="pedir" disabled>Pedido!</ons-button>
            </p>
    
            `
        );
    }else{
        $('#divComprar').html(
            `
            <p id="estiloPrecio">
                <span id="canPrecio"><ons-input type="number" id="can" placeholder="Cantidad"> </ons-input></span>
                <ons-button id="calcular" onclick="calcularPrecio(${producto.precio})">Calcular</ons-button>
            </p>
            <p id="resultadoCalcular">
            </p>
    
            <ons-select id="sucOpcion">
            </ons-select>
               
            <p>
            <ons-button id="pedir" onclick="crearPedido()">Pedido!</ons-button>
            </p>
    
            `
        );
    }

}

function prepararMapa() {

    //remuevo el mapa si existe un mapa activo
    if (mymap) {
        mymap = mymap.remove();
    }
    //inicializo nuevamente el mapa
    mymap = L.map('mapid').setView([posUsuario.latitud, posUsuario.longitud], 11);
    //agrego la cartografía
    L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWNhaWFmYSIsImEiOiJjanh4cThybXgwMjl6M2RvemNjNjI1MDJ5In0.BKUxkp2V210uiAM4Pd2YWw",
        {
            attribution:
                'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: "mapbox/streets-v11",
            accessToken: "your.mapbox.access.token",
        }
    ).addTo(mymap);
    var myIcon = L.icon({
        iconUrl: './assets/img/user.png',
        iconSize: [25, 40],
        iconAnchor: [12, 54],
        popupAnchor: [-3, -76],
        shadowUrl: '',
        shadowSize: [68, 95],
        shadowAnchor: [22, 94]
    });

    //ubico al usuario conectado
    L.marker([posUsuario.latitud, posUsuario.longitud], { icon: myIcon }).addTo(mymap).bindPopup(onUser.data.nombre + ' ' + onUser.data.apellido);
}

/*-------------- FIN CATALOGO --------------- */

/* ---------- PEDIDOS --------*/
function crearPedido() {
    let suc = $("#sucOpcion").val();
    let can = Number($("#can").val());
    if (suc != "" && can != "" && can > 0) {
        altaPedido(codigoProducto, suc, can);
    } else {
        ons.notification.toast('Error, debe introducir datos', { timeout: 2000, animation: 'fall' });
    }
}

function armarPedidos(pedidos) {
    let listadoHtml = "";
    for (let i = 0; i < pedidos.data.length; i++) {
        let p = pedidos.data[i];
        if (p.estado === "pendiente") {
            listadoHtml +=
                `<ons-list-item tappable>
                <div class="center product-card">
                <img class="imgNotFound"  src='http://ec2-54-210-28-85.compute-1.amazonaws.com:3000/assets/imgs/${p.producto.urlImagen}.jpg' onerror="this.src='img/no-image.png'">
                    <p class="list-item__title pNombre">${p.producto.nombre}</p>
                    <p class="list-item__subtitle pPrice"><span><ons-icon icon="fa-dollar-sign" class="list-item__icon"></ons-icon></span> ${p.total}</p>
                    <p class="list-item__title pSucursal"><span><ons-icon icon="fa-store" class="list-item__icon storeIcon"></ons-icon></span>${p.sucursal.nombre}</p>
                    <p class="list-item__subtitle pStock" style="color:#f5a225"><span><ons-icon icon="fa-clock" class="list-item__icon storeIcon" style="color:#f5a225"></ons-icon></span>${p.estado}</p>
                    <ons-button id="addComment" onclick="showPrompt('${p._id}')">Añadir comentario!</ons-button>              
                    </div>
            </ons-list-item>`
        } else {
            listadoHtml +=
            `<ons-list-item tappable>
            <div class="center product-card">
            <img class="imgNotFound"  src='http://ec2-54-210-28-85.compute-1.amazonaws.com:3000/assets/imgs/${p.producto.urlImagen}.jpg' onerror="this.src='img/no-image.png'">
                <p class="list-item__title pNombre">${p.producto.nombre}</p>
                <p class="list-item__subtitle pPrice"><span><ons-icon icon="fa-dollar-sign" class="list-item__icon"></ons-icon></span> ${p.total}</p>
                <p class="list-item__title pSucursal"><span><ons-icon icon="fa-store" class="list-item__icon storeIcon"></ons-icon></span>${p.sucursal.nombre}</p>
                <p class="list-item__subtitle pStock"><span><ons-icon icon="fa-check-circle" class="list-item__icon storeIcon"></ons-icon></span>${p.estado}</p>
            </div>
        </ons-list-item>`
        }

    }
    $('#listaPedidosDiv').html(listadoHtml);

}


function agregarComentario(message, pedido) {

    modificarEstadoPedido(pedido, message)

}

function showPrompt(pedido) {

    {
        ons.notification.prompt('Pedido!')
            .then(function (input) {
                var message = input ? 'comentario: ' + input : '';

                agregarComentario(message, pedido);
            });
    };
}

/* ---------- FIN PEDIDOS --------*/


/* ---------- FUNCIONES GENERICAS --------*/

function successCallLogin(r) {
    onUser = r;
    window.localStorage.setItem("token", onUser.data.token);
    console.log(onUser.data.nombre + " se logueo correctamente" + onUser.data.token);
    cargarCatalogo();
    cargarFavoritasUsuario();
    goHome();
}

function btnGoLogin() {
    myNavigator.resetToPage('login.html');
}

function btnGoRegistro() {
    myNavigator.pushPage('registro.html');
}

function goHome() {
    myNavigator.pushPage('home.html');
}

function goPedido() {
    myNavigator.pushPage('pedidos.html');
}

function btnLogout() {
    onUser = null;
    window.localStorage.removeItem("token");
    btnGoLogin();
    console.log("Se cerro la sesion satisfactoriamente");
    setTimeout(function () {
        showAlert("Se cerro sesion correctamente!", "#loginDiv", 0);
    }, 1000);
}

function goScanQR() {
    myNavigator.pushPage("scanQR.html");
}
/* ------------ FIN FUNCIONES GENERICAS -------------*/


/* ------------ MOSTRAR Y OCULTAR ALERTS -------------*/
function showAlert(mensaje, divReferencia, alertType) {
    let divMostrar = divReferencia;
    let divError;

    switch (alertType) {
        case 0:
            // Mensaje de exito
            let divSuccess = "#successAlert";
            divMsj = `
            <div id="successAlert">
                <p id="pError">${mensaje}</p>
            </div>`;
            $(divMostrar).append(divMsj);
            ocultarAlert(divSuccess);
            break;

        case 1:
            //Mensaje error
            let divError = "#errorAlert";
            divMsj = `
            <div id="errorAlert">
                <p id="pError">${mensaje}</p>
            </div>`;
            $(divMostrar).append(divMsj);
            ocultarAlert(divError);
            break;
    }

}

function ocultarAlert(alertDiv) {
    setTimeout(function () {
        $(alertDiv).hide();
        $(alertDiv).remove();
    }, 4000
    );

}

/* ------------ FIN MOSTRAR Y OCULTAR ALERTS -------------*/



/* ------------- FAVORITOS --------------- */

//función para guardarFavoritos
function guardarFavoritos() {

    let itemUsuario = listadoUsuarioFavoritas.find(function (item) {
        return item.email === onUser.data.email
    })

    if (!itemUsuario) {
        listadoUsuarioFavoritas.push({
            email: onUser.data.email,
            favoritas: favoritasUsuarioConectado
        })
    }
    window.localStorage.setItem('listadoUsuarioFavoritas', JSON.stringify(listadoUsuarioFavoritas))
}

function cargarFavoritasUsuario() {

    //recorro la lista completa
    for (let i = 0; i < listadoUsuarioFavoritas.length; i++) {
        //me quedo con un item
        let item = listadoUsuarioFavoritas[i];

        //si ese item corresponde al usuario que se conecta
        if (item.email === onUser.data.email) {
            //establezo la referencia
            favoritasUsuarioConectado = item.favoritas;
            return;
        }
    }
    //sino está, la inicializo vacía
    favoritasUsuarioConectado = [];
}

function favReceta(pId) {

    //variable local para guardar el color del ícono
    let color;

    //si el id de la receta no está en el array
    if (favoritasUsuarioConectado.indexOf(pId) === -1) {
        //la agrego
        favoritasUsuarioConectado.push(pId);
        //muestro el toast al usuario
        ons.notification.toast(`Yeah!, Producto añadido a favoritos`, { timeout: 2000 })
        //seteo el color 
        color = 'red';
    } else {
        //la borro del array
        favoritasUsuarioConectado.splice(favoritasUsuarioConectado.indexOf(pId), 1);
        //muestro el toast
        ons.notification.toast(`Producto borrado de favoritos`, { timeout: 2000 })
        //seteo el color
        color = '#838383';
    }
    //selecciono el icono de la receta guardada y le cambio el color
    document.getElementById('fav' + pId).style.color = color
    //actualizo la lista de favoritas en el local storage
    guardarFavoritos();

    cargoFavoritos();
}

function armarFavs(productos) {
    let listadoHtml = "";
    for (let i = 0; i < productos.length; i++) {
        let p = productos[i];
        if (favoritasUsuarioConectado.indexOf(p._id) != -1) {
            color = "red"
        }
        listadoHtml +=
            `<ons-list-item tappable>
          <div class="product-card">
          <img class="imgNotFound"  src='http://ec2-54-210-28-85.compute-1.amazonaws.com:3000/assets/imgs/${p.urlImagen}.jpg' onerror="this.src='img/no-image.png'" onclick="irDetalleCatalogo('${p._id}')">
            <p class="list-item__title pCodigo">${p.codigo} <span style="color:${color}" id="fav${p._id}" onclick="favReceta('${p._id}')"><ons-icon  icon="md-favorite" class="list-item__icon md-favorite" ></ons-icon></span></p>
            <p class="list-item__title pNombre" onclick="irDetalleCatalogo('${p._id}')">${p.nombre}</p>
            <p class="list-item__title pPrice"><span><ons-icon  icon="fa-dollar-sign" class="list-item__icon"></ons-icon></span>${p.precio}</p>
            <p class="list-item__subtitle pStock">${p.estado}</p>
          </div>
        </ons-list-item>`
    }
    $('#favlistDiv').html(listadoHtml);

}

/* ------------- FIN FAVORITOS --------------- */




