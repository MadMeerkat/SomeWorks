
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