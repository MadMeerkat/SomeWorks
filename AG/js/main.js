// ELEMENTOS A CREAR

/* BANNER */
class Banner {
    constructor(id, url, texto) {
        this.id = id;
        this.url = url;
        this.texto = texto;
    }
}

let banners = [
    new Banner(1, 'img/viajar.png', 'ANÍMATE A PROBAR UNA MANERA DIFERENTE DE VIAJAR'),
    new Banner(2, 'img/playa.png', 'NO TE QUEDES SIN VACACIONES!'),
    new Banner(3, 'img/paris2.jpg', 'ANÍMATE A CONOCER EUROPA')
];


/* DESTINOS */
class Destino {
    constructor(id, url, dest, icon, continente, size) {
        this.id = id;
        this.url = url;
        this.dest = dest;
        this.icon = icon;
        this.continente = continente;
        this.size = size;
    }
}


let destinos = [
    new Destino(1, 'img/europa.jpg', 'Paris', 'fa-globe-europe', 'europa', 8),
    new Destino(2, 'img/tokyo.jpg', 'Tokyo', 'fa-globe-asia', 'asia', 4),
    new Destino(3, 'img/peru.jpg', 'Cuzco', 'fa-globe-americas', 'america', 12),
];

/* SERVICIOS */
class Servicio {
    constructor(id, nombre, text, icon) {
        this.id = id;
        this.nombre = nombre;
        this.text = text;
        this.icon = icon;

    }
}


let servicios = [
    new Servicio(1, 'Aéreos', 'Buscamos itinerarios que se adapten a tus necesidades, trabajando con las múltiples aerolíneas comerciales alrededor del mundo', 'fas fa-plane-departure'),
    new Servicio(2, 'Cruceros', 'Fantásticos cruceros en las mejores compañías con innumerables destinos.', 'fas fa-ship'),
    new Servicio(3, 'Excursiones', 'Asesoramiento y planificacion de las mejores excursiones en los cinco continentes.', 'far fa-map'),
    new Servicio(4, 'Hoteles', 'Enorme variedad de opciones para alojarte alrededor del mundo.', 'fas fa-concierge-bell"'),
    new Servicio(5, 'Traslados', 'Traslados ya sea individuales o compartidos, en las distintas ciudades del mundo.', 'fas fa-taxi'),
    new Servicio(6, 'Seguros de viaje', 'Viaja respaldado con las mejores opciones de asistencia en viajes y así disfrutar tranquilo de su viaje.', 'fas fa-briefcase-medical'),
    new Servicio(7, 'Financiación', 'Consulta por nuestros planes de financiación.', 'far fa-credit-card')
];

//FIN ELEMENTOS A CREAR

const generarRandom = () => {
    let n = Math.round(Math.random() * (3 - 1) + 1);
    return n;
}

const infoBanner = (lista) => {
    let n = generarRandom();
    console.log(n);
    let flag = false;
    let info = [];
    let i = 0;

    while (flag === false && i <= lista.length) {
        if (lista[i].id === n) {
            info = lista[i];
            flag = true;
        }
        i++;
    }
    return info;
}

const generarBanner = () => {
    let info = infoBanner(banners);

    $('#banner-principal').css('background-image', 'url(' + info.url + ')');
    $('#banner-principal').html(`
        <article class='col-12 text-center'>
            <h1>${info.texto}</h1>
            <hr class='banner-line'>
            <a href="https://www.facebook.com/AmorosoViajes/" target="_blank"><button class='btn-contactar'>Consultar YA!</button></a>
        </article>
    `)
}


const generarDestinos = () => {
    $('#cards-destinos').html("");

    for (i = 0; i < destinos.length; i++) {
        $('#cards-destinos').append(`
        <div id="${destinos[i].id}" class="col-12 col-md-${destinos[i].size} card-destino">    
            <div class="card-caption">
                <p><span class="fas ${destinos[i].icon}"></span>${[destinos[i].dest]}</p>
            </div>
        </div>
    `)
    }
    bgDestinos();
}

const bgDestinos = () => {
    for (i = 0; i < destinos.length; i++) {
        $('#' + destinos[i].id).css('background-image', 'url(' + destinos[i].url + ')');
    }
}

const generarServicios = () => {
    $('#cards-servicios').html("");
    for (i = 0; i < servicios.length; i++) {

        $('#cards-servicios').append(`
            <div class="card-servicio col-12 col-md-4">
            <p class="text-uppercase service-name text-center"><span class="${servicios[i].icon}"></span>${servicios[i].nombre}</p>
            <p class="service-detail text-left">${servicios[i].text}</p>
             </div>
        `)
    }

}

/* EFECTO SCROLL MOBILE */
$(document).ready(function scrollMobile(){

    if ($(window).width() < 990){
        $("a").on('click', function(event) {
  
            // Make sure this.hash has a value before overriding default behavior
            if (this.hash !== "") {
              // Prevent default anchor click behavior
              event.preventDefault();
        
              // Store hash
              var hash = this.hash;
        
              // Using jQuery's animate() method to add smooth page scroll
              // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
              $('html, body').animate({
                scrollTop: $(hash).offset().top
              }, 600, function(){
           
                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
              });
                 
            } 
          });  
    }


  });