//Carga texto menu
$(document).ready(typingText())
$(document).ready(setInterval(bounceArrow,1500));
// Carga elementos
cargarServicios();

// Botones
$('#btnMision').click(changeUsInfo);
$('#btnVision').click(changeUsInfo);
$('#btnNosotros').click(changeUsInfo);
$('.btn-contratar').click(modalContratar);




// Menu Mobile
$(".menu-icon").click(desplegarMenu);




