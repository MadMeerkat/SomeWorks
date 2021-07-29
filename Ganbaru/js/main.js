// CLASES
/* BANNER */
class Servicio {
  constructor(id, nombre, incluye) {
      this.id = id;
      this.nombre = nombre;
      this.incluye = incluye;
  }
}

class Caracs {
  constructor (nombre,estado){
    this.nombre = nombre;
    this.estado = estado;
  }
}

// CARACTERISITICAS PARA LOS SERVICIOS
let caracteristicas1 = [
  new Caracs ('car1',true),
  new Caracs ('car2',false),
  new Caracs ('car3',false),
];

let caracteristicas2 = [
  new Caracs ('car1',true),
  new Caracs ('car2',true),
  new Caracs ('car3',false),
];

let caracteristicas3 = [
  new Caracs ('car1',true),
  new Caracs ('car2',true),
  new Caracs ('car3',true),
];

let Servicios = [
  new Servicio(1, 'Promo 1',caracteristicas1),
  new Servicio(2, 'Promo 2', caracteristicas2),
  new Servicio(3, 'Promo 3', caracteristicas3)
];


//Menu Responsive
let x = 1; //Indica si el menu esta abierto o cerrado
function desplegarMenu() {
  if (x == 1) {
    $('.mobile-options').animate({
      top: '57'
    },
      650); // tiempo de la transicion
    x = 0;
  } else {
    x = 1;
    $('.mobile-options').animate({
      top: '-900'
    },
      1550);// tiempo de la transicion

  }
}

// Typing Function

let showText = ["CREA", "INNOVA", "EMPRENDE."];
let txt = "";
let actualText = "";
let iShowText = 0; // i posicion letra
let indexShowText = 0; // i array
function typingText() {

  if (indexShowText < 3) {
    if (iShowText < showText[indexShowText].length) {
      txt = txt + showText[indexShowText].charAt(iShowText);
      actualText = actualText + showText[indexShowText].charAt(iShowText);
      $("#pPrincipal").html(txt);
      iShowText++;
      setTimeout(typingText, 250);
    }

    if (actualText === showText[indexShowText]) {
      indexShowText++;
      iShowText = 0;
      actualText = "";
      txt = txt + '<br>';
    }
    if (indexShowText === showText.length - 1){
      $(".arrow-icon").fadeTo(180, 1)
    }
  }
}

// Bounce
function bounceArrow() {
  $(".arrow-icon").animate({ marginTop: "80px" }, 
  1500).animate({ marginTop: "40px" }, 
  800);
}



// FADE 
$(window).on("load", function () {
  $(window).scroll(function () {
    var windowBottom = $(this).scrollTop() + $(this).innerHeight();
    $(".algo").each(function () {

      var objectBottom = $(this).offset().top + $(this).outerHeight();


      if (objectBottom < windowBottom) { 
        if ($(this).css("opacity") == 0) { $(this).fadeTo(600, 1); }
      }
    });
  }).scroll();
});


//Modificacion texto
function changeUsInfo(){
  let idBtn = $(this).attr("id"); //"trae el id del btn que se toco"
  switch (idBtn) {
    case 'btnMision':
      $('#us-subtitle').text('Mision');
      $('#us-info').text('Mision ipsum dolor sit amet, consectetur adipiscing elit. Cras lacus magna, pellentesque vel nulla eget, sollicitudin congue arcu. Pellentesque at justo consectetur, fringilla urna vitae, pharetra odio. Sed venenatis lacus quis diam rutrum mattis. Proin tempus dictum nisl, et volutpat est convallis ac. Aliquam erat volutpat. Donec dui augue, semper in euismod et, scelerisque ut nibh. Etiam ex est, blandit nec bibendum et, convallis sit amet eros.');
      $('#btnMision').addClass('btnActivo');
      $('#btnVision').removeClass('btnActivo');
      $('#btnNosotros').removeClass('btnActivo');
      break;

    case 'btnVision':
      $('#us-subtitle').html('Vision');
      $('#us-info').html('Vision ipsum dolor sit amet, consectetur adipiscing elit. Cras lacus magna, pellentesque vel nulla eget, sollicitudin congue arcu. Pellentesque at justo consectetur, fringilla urna vitae, pharetra odio. Sed venenatis lacus quis diam rutrum mattis. Proin tempus dictum nisl, et volutpat est convallis ac. Aliquam erat volutpat. Donec dui augue, semper in euismod et, scelerisque ut nibh. Etiam ex est, blandit nec bibendum et, convallis sit amet eros.');
      $('#btnMision').removeClass('btnActivo');
      $('#btnVision').addClass('btnActivo');
      $('#btnNosotros').removeClass('btnActivo');
      break;

    default:
      $('#us-subtitle').html('Nosotros');
      $('#us-info').html('Phasellus placerat ullamcorper risus luctus iaculis. Donec elit nunc, hendrerit id dictum id, auctor non risus. Donec id tincidunt nulla. Etiam tempor fringilla sapien. Etiam vehicula tortor ac congue accumsan. Aenean vel magna quis massa eleifend consectetur. In nec auctor arcu. Duis at nisi accumsan erat pulvinar pellentesque a ac sapien. Cras nec quam posuere, ullamcorper felis ut, porta neque. Integer sed purus et arcu vehicula pharetra. Vivamus ultricies justo eget lobortis pellentesque. Donec volutpat ante sed tellus scelerisque commodo. Phasellus iaculis tempus mi non mollis. Nunc sed rutrum massa.');
      $('#btnMision').removeClass('btnActivo');
      $('#btnVision').removeClass('btnActivo');
      $('#btnNosotros').addClass('btnActivo');
      break;
  }
}


// Modal de contratacion

function modalContratar(){
  let idBtn = $(this).attr('id');
  let id= idBtn.charAt(idBtn.length - 1);
  id = parseInt(id,10); // parseo el charat en base 10
  let serv = traerServicio(id);
  if(idBtn != undefined){
    $("#modal-contratar").html(`
    <article class="col-12 col-md-6 mx-auto text-center contratar-card">
      <h2 class='service-title'><span class="fas fa-award"></span>${serv.nombre}<span class="fas fa-times btnClose"></span></h2>
      
      <table class='mx-auto'>
        <tr>
            <th>Caracterisitica</th>
            <th>Incluido</th>
        </tr>
        ${cargarCars(serv.incluye)}
      </table>
     
      <input type="text" id="txtName" class="d-block mx-auto" placeholder="Nombre"></input>
      <input type="text" id="txtSurname" class="d-block mx-auto" placeholder="Apellido"></input>
      <input type="email" id="txtEmail" class="d-block mx-auto" placeholder="Correo Electronico"></input>
      <input type="button" id="btnContinuar" class="btnContinuar" value="Contratar">
    </article>
    `);
    $('#modal-contratar').show();
  }
  $('.btnClose').click(closeModalContratar);
  $('#btnContinuar').click(contratarServicio);

}

// CARGAR TABLAS SERVICIOS
const cargarServicios = () =>{
  for ( i=0; i < Servicios.length; i++ ){
    $("#services-table").append(`
    <article class="col-sm-12 col-md-4 card-service">
    <h3 class="text-center"><span class="fas fa-award"></span>${Servicios[i].nombre}</h3>
    <table>
        <tr>
            <th>Caracterisitica</th>
            <th>Incluido</th>
        </tr>
        ${cargarCars(Servicios[i].incluye)}
    </table>
    <button id="servicio-${Servicios[i].id}" class="btn d-block mx-auto btn-contratar">Contratar</button>
    </article>
    `);
  }
}

const cargarCars = (objeto) =>{
   trTxt = ''
  for(j=0; j < objeto.length; j++){
    trTxt += `
          <tr>
            <td class="serviceCar">${objeto[j].nombre}</td>
          `;
          if (objeto[j].estado === true){
            trTxt += `
            <td><span class="fas fa-check"></span></td>
            </tr>
            `
          }else{
            trTxt += `
            <td><span class="fas fa-times"></span></td>
            </tr>`;
          } 
  }
  
  return trTxt;
}

const traerServicio = (id) =>{
  let flag = false;
  let i = 0;
  let serv;
  while (!flag && i < Servicios.length) {
    if(Servicios[i].id === id){
      serv = Servicios[i];
      flag=true; 
    }
    i++;
  }

  return serv;
}

const closeModalContratar = () =>{
  $('#modal-contratar').hide();
  console.log('se cerro el modal')
}

const toast = (tipo, mensaje) =>{
 if (tipo === 1){
  alert(mensaje);
 }else{
  alert(mensaje);
 }
}

const contratarServicio = () =>{
  let nombre = $("#txtName").val();
  let apellido = $("#txtSurname").val();
  let email = $("#txtEmail").val();
  let mensaje;
  if(nombre == "" || apellido =="" || email == ""){
    mensaje = "Hay campos incompletos"
    toast(2,mensaje);
  }else{
    mensaje = "Gracias por contratar el servicio"
    closeModalContratar();
    toast(2,mensaje);
  }
}