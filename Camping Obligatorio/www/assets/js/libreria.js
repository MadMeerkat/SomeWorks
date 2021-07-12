/*INFO ALERT TYPES*/
// 0 = success
// 1 = error


/*------------ INIT ------------*/
ons.ready(init);

function init() {
    myNavigator = document.querySelector('#myNavigator');
    spinnerModal = document.querySelector('#spinnerModal');

    window.navigator.geolocation.getCurrentPosition(
        function (geoData) {

            posUsuario.latitud = geoData.coords.latitude;
            posUsuario.longitud = geoData.coords.longitude;
        },
        function (errorData) {
            ons.notification.toast('No se pudo obtener la posición!', { timeout: 2000 })
        }
    )

    let tokenActivo = window.localStorage.getItem("token");

    if (tokenActivo) {
        $.ajax({
            type: "GET",
            url: urlFija + "usuarios/session",
            contentType: "application/json",
            beforeSend: beforeSendHook,
            success: function (r) {
                onUser = r;
                myNavigator.pushPage('home.html');
                cargarCatalogo();
                cargarFavoritasUsuario();

            },
            complete: function () {
                console.log("Init completo");
            }
        });
    }



    listadoUsuarioFavoritas = JSON.parse(window.localStorage.getItem("listadoUsuarioFavoritas"));
    if (!listadoUsuarioFavoritas) {
        listadoUsuarioFavoritas = [];
    }
    console.log(listadoUsuarioFavoritas);

}

// ACA ESTA EL x-auth
function beforeSendHook(request) {
    //obtengo el token del local storage
    let token = window.localStorage.getItem('token');

    //seteo el header x-auth con el valor del token
    request.setRequestHeader("x-auth", token);
}

/*------------ FIN INIT ------------*/

/*------------ DEVICEREADY CORDOVA ------------*/
document.addEventListener('deviceready', deviceReadyHandler, false);


function deviceReadyHandler() {
    //listener al evento disparado por cordova cuando detecta que el dispositivo no tiene red
    document.addEventListener('offline', offlineHandler, false);
    //listener al evento disparado por cordova cuando detecta que el dispositivo recupera la red
    document.addEventListener('online', onlineHandler, false);

    //pido permisos para usar la camara
    QRScanner.prepare(prepareCallback);
}

//habdler offline
function offlineHandler() {
    myNavigator.pushPage('offline.html');
}

//handler online
function onlineHandler() {
    myNavigator.popPage();
}


//callback de la función que pide permisos 
//para usar la cámara
function prepareCallback(err, status) {
    if (err) {
        //en caso de cualquier tipo de error
        return ons.notification.alert(JSON.stringify(err));
    }
    if (status.authorized) {
        //tenemos acceso y el escaner está inicializado

    } else if (status.denied) {
        //el usuario rechazó el pedido, la pantalla queda en negro.
        //Podemos volver a preguntar mandando al usuario
        //a la configuración de permisos con QRScanner.openSettings().

    } else {
        //nos rechazaron solo por esta vez. Podríamos volver a hacer el pedido.

    }
}

//función que se dispara al ingresar a la página del scanner
function escanear() {
    console.log('función escanear')
    //si hay scanner
    if (window.QRScanner) {
        //esto lo uso para mostrar la cam en la app...
        //por defecto la vista previa queda por encima del body y el html.
        //pero por un tema de compatibilidad con onsen queda por debajo de la page.
        //Agregar el css y para que esta page sea transparente con el fin de que se vea la camara
        window.QRScanner.show(function (status) {
            //función de scan y su callback
            window.QRScanner.scan(scanCallback);
        });
    }
}

/**
* Función que ejecutará el plugin del scanner una vez haya concluido el escaneo
* esta es la función que debemos probar en consola para garantizar que 
* lo que nosotros hacemos al escanear funciona 
*/
function scanCallback(err, scanDataText) {

    //si hay error
    if (err) {
        ons.notification.alert(JSON.stringify(err))
    } else {
        //si hay scanner...
        if (window.QRScanner) {
            //si no hay error escondo el scanner 
            window.QRScanner.hide();
        }
        //y vuelvo a la pantalla anterior pasando el string que se escaneó con el texto a filtrar

        ons.notification.toast(scanDataText, { timeout: 2000 })
        textoScanner = scanDataText;
        myNavigator.popPage;
    }

}

/*------------ FIN DEVICEREADY CORDOVA ------------*/

/* ----------- LOGIN -------------- */
function userLogin() {
    let emailLogin = $("#txtEmail").val();
    let passwordLogin = $("#txtPassword").val();

    if (validarLogin(emailLogin, passwordLogin)) {
        $.ajax({
            type: "POST",
            url: urlFija + "usuarios/session",
            contentType: "application/json",
            data: JSON.stringify({ email: emailLogin, password: passwordLogin }),
            success: successCallLogin,
            error: errorCallBackLogin,
            complete: function () {
                console.log("llamado terminado");
            },
        });
    }
}

function errorCallBackLogin(r) {
    switch (r.status) {
        case 400:
            mensaje = "Ups!, " + r.responseJSON.error;
            showAlert(mensaje, "#loginDiv", 1)
            console.log("Error" + mensaje);
            break;
        case 404:
            mensaje = "Ups!, " + r.responseJSON.error;
            showAlert(mensaje, "#loginDiv", 1)
            console.log("Error" + mensaje);
            break;
    }
};
/* ----------- FIN LOGIN -----------*/

/* ----------- REGISTRO -------------- */
function btnRegistro() {
    let nombre = $("#txtNombre").val();
    let apellido = $("#txtApellido").val();
    let direccionCalle = $("#txtDireccion").val();
    let nroPuerta = $("#txtNroPuerta").val();
    let email = $("#txtEmailRegistro").val();
    let password = $("#txtPasswordRegistro").val();

    if (validarRegistro(nombre, apellido, direccionCalle, nroPuerta, email, password)) {
        let direccion = direccionCalle + " " + nroPuerta;
        $.ajax({
            type: "POST",
            url: urlFija + "usuarios",
            contentType: "application/json",

            data: JSON.stringify({ nombre: nombre, apellido: apellido, direccion: direccion, email: email, password: password }),
            success: function () {
                console.log("Usuario registrado con éxito");
                $("#txtNombre").val("");
                $("#txtApellido").val("");
                $("#txtDireccion").val("");
                $("#txtNroPuerta").val("");
                $("#txtEmailRegistro").val("");
                $("#txtPasswordRegistro").val("");
                showAlert("Yeah! Usuario registrado con exito, en breves seras redireccionado al login.", "#registerDiv", 0)
                setTimeout(function () {
                    btnGoLogin();
                }, 5000
                );
            },
            error: errorCallBackRegistro,
            complete: function () {
                console.log("llamado terminado");
            },
        });
    }
}

function errorCallBackRegistro(r) {
    if (r.status === 400) {
        mensaje = "Ups!, " + r.responseJSON.error;
        showAlert(mensaje, "#registerDiv", 1)
        console.log("Error" + mensaje);
    }
}

/* ------------- FIN REGISTRO -------------- */

/* ------------- CATALOGO -------------- */
function cargarCatalogo() {
    $.ajax({
        type: "GET",
        url: urlFija + "productos",
        contentType: "application/json",
        beforeSend: beforeSendHook,
        success: function (responseBody) {
            listaProductos = responseBody.data;
            console.log(responseBody);
            let rProducto;
            if(textoScanner) {
                scanearQrCatalogo(textoScanner);
                textoScanner = null;
            } else {
                rProducto = responseBody.data
            }

            armarCatalogo(rProducto);
        },
        error: function () {
            console.log("Hubo un error al cargar el catalogo.")
        },
        complete: function () {
            console.log("Llamado al catalogo completo.");
        },
    });
}

function cargarDetalleCatalogo() {
    console.log(this.data);
    //spinnerModal.show();

    $.ajax({
        type: 'GET',
        url: urlFija + "productos/" + this.data._id,
        contentType: "application/json",
        beforeSend: beforeSendHook,
        success: function (responseBody) {
            console.log(responseBody);
            let producto = responseBody.data;

            if(producto.estado != "en stock"){
                stockColor = "#de2222";
            }else{
                stockColor = "#43af69";
            }

            $('#divDetalleProducto').html(
                `
                <img class="imgNotFound" src='http://ec2-54-210-28-85.compute-1.amazonaws.com:3000/assets/imgs/${producto.urlImagen}.jpg' onerror="this.src='./img/no-image.png'">
                <p class="pNombre">${producto.nombre}</p>
                <p class="pCodigo">Puntaje: ${producto.puntaje} </p>
                <p class="pDetalle">Detalle: ${producto.descripcion}</p>
                <p class="pStock" style="color:${stockColor}">${producto.estado} </p>
                <p class="pPrice"><span><ons-icon icon="fa-dollar-sign" class="list-item__icon"></ons-icon></span>${producto.precio}</p>
                `
            )
            compraProducto(producto);
            llamarSucursales();

        },
        error: function () {
            console.log("Hubo un error al cargar el detalle.")
        },
        complete: function () {
            console.log("Llamado al detalle completo.");
        },
    })
}

function llamarSucursales() {
    $.ajax({
        type: "GET",
        url: urlFija + "sucursales",
        contentType: "application/json",
        beforeSend: beforeSendHook,
        success: function (responseBody) {
            console.log("SUCU" + responseBody);
            console.log("Imprimiendo sucursales...");
            listSucursales(responseBody);
            recorrerSuc(responseBody);
            prepararMapa();
        },
        error: function () {
            console.log("Error llamando a las sucursales");
        },
        complete: function () {
            console.log("Llamado a la sucursal completo.");
        },
    })


}

function listSucursales(listado) {
    sucursales = listado;
    selectHtml = `<ons-select id="sucOpcion">
    <option value="x">Seleccione una sucursal...</option>
    `;

    for (let i = 0; i < sucursales.data.length; i++) {
        let lista = sucursales.data[i];
        $("#sucOpcion").html(
            selectHtml +=
            `
            <option value="${lista._id}">${lista.nombre}</option>
            `
        );
    }

    selectHtml += `</ons-select>`;
    $("#sucOpcion").html(selectHtml);
}

function recorrerSuc(lista) {
    for (let i = 0; i < lista.data.length; i++) {
        sucursal = lista.data[i];
        buscarPosicionSucursal(sucursal);
    }
}

function buscarPosicionSucursal(pSuc) {

    $.ajax({
        method: 'GET',
        url: `http://nominatim.openstreetmap.org/search?format=json&street=${pSuc.direccion}&country=${pSuc.pais}&city=${pSuc.ciudad}`,
        success: function (dataResponse) {
            //en caso de éxito y de que haya algún dato.
            console.log(dataResponse);
            if (dataResponse.length > 0) {
                //tomo el primero (si los datos de la dirección son precisos solo debería tener 1)
                let sucursal = dataResponse[0];
                //preparo el mapa

                //utilizo la función de distancia que tiene el mapa para calcular la distancia en metros
                let distanciaMetros = mymap.distance(L.latLng(posUsuario.latitud, posUsuario.longitud), L.latLng(sucursal.lat, sucursal.lon))
                //convierto a km con 2 lugares luego de la coma
                let distanciaKm = (distanciaMetros / 1000).toFixed(2);
                //agrego todos los datos al marcador
                var myIcon = L.icon({
                    iconUrl: './assets/img/store.png',
                    iconSize: [25, 40],
                    iconAnchor: [12, 54],
                    popupAnchor: [-3, -76],
                    shadowUrl: '',
                    shadowSize: [68, 95],
                    shadowAnchor: [22, 94]
                });
                L.marker([sucursal.lat, sucursal.lon], { icon: myIcon }).addTo(mymap).bindPopup(`${pSuc.nombre} ${distanciaKm}km`);
            } else {
                ons.notification.toast('Error al cargar la sucursal en el mapa.', { timeout: 2000 })
            }
        },
        error: "Error",
        complete: "Complete"
    })
}

function filtrarCatalogo(valorFiltro) {

    $.ajax({
        type: "GET",
        url: urlFija + "productos" + "?nombre=" + valorFiltro,
        contentType: "application/json",
        beforeSend: beforeSendHook,
        success: function (r) {
            console.log(r);
            console.log(valorFiltro);
            armarCatalogo(r.data);
        },
        error: function () {
            console.log("Error al filtrar o no hay datos")
        },
        complete: function () {
            console.log("Filtrar Catalogo se completo");
        }

    });
}


function scanearQrCatalogo(valorFiltro) {

    $.ajax({
        type: "GET",
        url: valorFiltro,
        contentType: "application/json",
        beforeSend: beforeSendHook,
        success: function (r) {
            console.log(r);
            console.log(valorFiltro);
            armarCatalogo(r.data);
        },
        error: function () {
            console.log("Error al filtrar o no hay datos")
        },
        complete: function () {
            console.log("Filtrar Catalogo se completo");
        }

    });
}

/* ------------- FIN CATALOGO -------------- */

/* ------------- PEDIDOS -------------- */

function altaPedido(idP, idS, can) {

    let nuevoPedido = {
        cantidad: can,
        idProducto: idP,
        idSucursal: idS
    }

    $.ajax({
        type: "POST", //método HTTP,
        url: urlFija + "pedidos", //url de la operación
        contentType: "application/json", //content type
        beforeSend: beforeSendHook,//hook que se ejecuta antes para cargar la autenticación
        data: JSON.stringify(nuevoPedido),
        success: function (responseBody) {//callback de éxito
            ons.notification.toast('Yeah! Pedido realizado', { timeout: 2000, animation: 'fall' });
        },
        error: "Error",//error Callback
        complete: "Pedido Completo"
    })

}

function cargarListaPedidos() {
    console.log(this.data);
    //spinnerModal.show();

    $.ajax({
        type: 'GET',
        url: urlFija + "pedidos",
        contentType: "application/json",
        beforeSend: beforeSendHook,
        success: function (responseBody) {
            console.log(responseBody);
            armarPedidos(responseBody);
        },
        error: function () {
            console.log("Hubo un error al cargar los pedidos.")
        },
        complete: function () {
            console.log("Llamado a los pedidos completo.");
        },
    })
}

function modificarEstadoPedido(pedido, comentario) {
    console.log(this.data);
    //spinnerModal.show();
    $.ajax({
        type: 'PUT',
        url: urlFija + "pedidos/" + pedido,
        contentType: "application/json",
        beforeSend: beforeSendHook,
        data: JSON.stringify({comentario: comentario}),
        success: function (responseBody) {
            console.log(responseBody);
            cargarListaPedidos();
            ons.notification.toast('Yeah! Comentario listo, el producto fue entregado.', { timeout: 2000, animation: 'fall' });
        },
        error: function () {
            console.log("Hubo un error al modificar los pedidos.")
        },
        complete: function () {
            console.log("Modificar pedidos completo.");
        },
    })
}

/* ------------- FIN PEDIDO -------------- */



/* ------------- FAVORITOS --------------- */

function cargoFavoritos() {

    $.ajax({
        type: "GET",
        url: urlFija + "productos",
        contentType: "application/json",
        beforeSend: beforeSendHook,
        success: function (r) {
            console.log(favoritasUsuarioConectado)
            let arrayFiltrado = r.data.filter(
                function (elem) {
                    return favoritasUsuarioConectado.indexOf(elem._id) !== -1
                }
            )
            //armo la lista de favoritos en la pantalla que corresponde
            armarFavs(arrayFiltrado);

        },
        error: function () {
            console.log("Error al cargar favoritos");
        },
        complete: function () {
            console.log("cargar favoritos completo");
        }

    });
}

/* ------------- FIN FAVORITOS --------------- */
