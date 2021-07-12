//INICIO SESION
//Se inicia la aplicación con la vision de usuario
mostrarBotones("user");
hideReport();
/*Posicion del usuario logueado, en la arrays de iniciarSesionC
para trabajar con el -> iniciarSesionC[onUser].propiedadUsuario*/
let onUser;
let someUserOn = false; // Variable que verifica si hay algun user on
//Contador incremental unico para recetas publicadas
let idContadorRecetasPublicadas = 20;
//Empiza en 4 por las recetas precargadas



//Arrays de los usuarios para iniciar sesion
class Usuario {
    constructor(usuario, contrasena, condicion, rol,nombre,apellido,receta) {
        this.usuario = usuario;
        this.contrasena = contrasena;
        this.habilitado = condicion;
        this.rol = rol;
        this.nombre = nombre;
        this.apellido = apellido;
        this.recetas = receta;
    }
}
let iniciarSesionC = [
    new Usuario("chef", "1", true,"admin","Chef","Chef",5),
    new Usuario("molivera", "m-olivera", true,"colaborador","Martina","Olivera",4),
    new Usuario("aamoroso", "a-amoroso", false,"colaborador","Alexis","Amoroso",4),
    new Usuario("ktrinidad", "k-trinidad", true,"colaborador","Keila","Trinidad",3),
    new Usuario("sfagnoni", "f-fagnoni", true,"colaborador","Santiago","Fagnoni",4)
];

//Arrays de las recetas
class Receta{
    constructor(id, autor, idAutor,rolAutor, titulo, tiempo, elaboracion, imagen,mostrar,meGusta,noMeGusta,rendimiento){
        this.id = id;
        this.autor = autor;
        this.idAutor = idAutor;
        this.rolAutor = rolAutor;
        this.titulo = titulo;
        this.tiempo = tiempo;
        this.elaboracion = elaboracion;
        this.imagen = imagen;
        this.mostrar = mostrar;
        this.meGusta = meGusta;
        this.noMeGusta = noMeGusta;
        this.rendimiento = rendimiento;
    }
}
let recetasPublicadas = [
new Receta(1,"Chef Chef","chef","admin","Torta de chocolate", 45, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis turpis augue, commodo et lorem quis, faucibus mollis justo. Etiam id ultrices urna quam.",`<img src="img/torta_de_chocolate.jpg"></img>`,true,24,6,80),
new Receta(2,"Chef Chef","chef","admin","Torta de vainilla", 50, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis turpis augue, commodo et lorem quis, faucibus mollis justo. Etiam id ultrices urna quam.",`<img src="img/torta_de_vainilla.jpg"></img>`,true,7,21,25),
new Receta(3,"Chef Chef","chef","admin","Pastel de papa", 60, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis turpis augue, commodo et lorem quis, faucibus mollis justo. Etiam id ultrices urna quam.",`<img src="img/pastel_de_papa.jpg"></img>`,true,3,7,30),
new Receta(4,"Chef Chef","chef","admin","Sopa", 30, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis turpis augue, commodo et lorem quis, faucibus mollis justo. Etiam id ultrices urna quam.",`<img src="img/sopa.jpg"></img>`,true,42,8,84),
new Receta(5,"Chef Chef","chef","admin","Tortilla de papa", 44, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis turpis augue, commodo et lorem quis, faucibus mollis justo. Etiam id ultrices urna quam.",`<img src="img/tortilla_de_papa.jpg"></img>`,true,12,8,60),
new Receta(6,"Santiago Fagnoni","sfagnoni","colaborador","Tortilla de papa", 30, " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis turpis augue, commodo et lorem quis, faucibus mollis justo. Etiam id ultrices urna quam.",`<img src="img/tortilla_de_papa.jpg"></img>`,true,24,6,80),
new Receta(7,"Alexis Amoroso","aamoroso","colaborador","Torta de chocolate", 45, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis turpis augue, commodo et lorem quis, faucibus mollis justo. Etiam id ultrices urna quam.",`<img src="img/torta_de_chocolate.jpg"></img>`,false,24,6,80),
new Receta(8,"Martina Olivera","molivera","colaborador","Torta de vainilla", 60, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis turpis augue, commodo et lorem quis, faucibus mollis justo. Etiam id ultrices urna quam.",`<img src="img/torta_de_vainilla.jpg"></img>`,true,7,21,25),
new Receta(9,"Santiago Fagnoni","sfagnoni","colaborador","Pastel de papa", 55, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis turpis augue, commodo et lorem quis, faucibus mollis justo. Etiam id ultrices urna quam.",`<img src="img/pastel_de_papa.jpg"></img>`,true,3,7,30),
new Receta(10,"Keila Trinidad","ktrinidad","colaborador","Sopa", 30, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis turpis augue, commodo et lorem quis, faucibus mollis justo. Etiam id ultrices urna quam.",`<img src="img/sopa.jpg"></img>`,true,24,6,80),
new Receta(11,"Alexis Amoroso","aamoroso","colaborador","Tortilla de papa", 40, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis turpis augue, commodo et lorem quis, faucibus mollis justo. Etiam id ultrices urna quam.",`<img src="img/tortilla_de_papa.jpg"></img>`,false,12,8,60),
new Receta(12,"Martina Olivera","molivera","colaborador","Tortilla de papa", 35, " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis turpis augue, commodo et lorem quis, faucibus mollis justo. Etiam id ultrices urna quam.",`<img src="img/tortilla_de_papa.jpg"></img>`,true,3,7,30),
new Receta(13,"Santiago Fagnoni","sfagnoni","colaborador","Tortilla de papa", 30, " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis turpis augue, commodo et lorem quis, faucibus mollis justo. Etiam id ultrices urna quam.",`<img src="img/tortilla_de_papa.jpg"></img>`,true,24,6,80),
new Receta(14,"Alexis Amoroso","aamoroso","colaborador","Torta de chocolate", 45, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis turpis augue, commodo et lorem quis, faucibus mollis justo. Etiam id ultrices urna quam.",`<img src="img/torta_de_chocolate.jpg"></img>`,false,42,8,84),
new Receta(15,"Martina Olivera","molivera","colaborador","Torta de vainilla", 30, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis turpis augue, commodo et lorem quis, faucibus mollis justo. Etiam id ultrices urna quam.",`<img src="img/torta_de_vainilla.jpg"></img>`,true,7,21,25),
new Receta(16,"Santiago Fagnoni","sfagnoni","colaborador","Pastel de papa", 65, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis turpis augue, commodo et lorem quis, faucibus mollis justo. Etiam id ultrices urna quam.",`<img src="img/pastel_de_papa.jpg"></img>`,true,3,7,30),
new Receta(17,"Keila Trinidad","ktrinidad","colaborador","Sopa", 25, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis turpis augue, commodo et lorem quis, faucibus mollis justo. Etiam id ultrices urna quam.",`<img src="img/sopa.jpg"></img>`,true,12,8,60),
new Receta(18,"Alexis Amoroso","aamoroso","colaborador","Tortilla de papa", 47, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis turpis augue, commodo et lorem quis, faucibus mollis justo. Etiam id ultrices urna quam.",`<img src="img/tortilla_de_papa.jpg"></img>`,false,12,8,60),
new Receta(19,"Martina Olivera","molivera","colaborador","Tortilla de papa", 70, " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis turpis augue, commodo et lorem quis, faucibus mollis justo. Etiam id ultrices urna quam.",`<img src="img/tortilla_de_papa.jpg"></img>`,true,24,6,80),
new Receta(20,"Keila Trinidad","ktrinidad","colaborador","Sopa", 35, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis turpis augue, commodo et lorem quis, faucibus mollis justo. Etiam id ultrices urna quam.",`<img src="img/sopa.jpg"></img>`,true,24,6,80)
];


verificarListaReceta();
// Mostrar/ocultar secciones
//mostrarBotones("admin"); //Preciso un tipo de usuario
mostrarSeccion(); //esconde las secciones
$(".btn").click(mostrarSeccion); // Muestra seccion segun BTN
//FIN MOSTRAR OCULTAR SECCIONES

//INICIAR SESION
$("#btnIniciarSesion").click(iniciarSesionCampo);
//CERRAR SESION
$("#btnSeccionLogin").click(logout);

//Crear usuario
$("#btnCrearUsuario").click(crearUsuario);

//LISTO USUARIOS
listarUsuarios();

//PUBLICAR RECETA
$("#btnPublicarReceta").click(datosPublicarReceta);

//Mostrar reportes
$("#btnReportes").click(listarReporte);

//Buscador

$("#btnSeccionBusqueda").click(tomarDatosBusqueda);

//Reporte
    //Segun tiempo ingresado
    reporteTiempoIngresado();
    //Segun duracion maxima
    reporteDuracionMaxima();
    //Segun rendimiento
   // reporteDuracionMaxima();

