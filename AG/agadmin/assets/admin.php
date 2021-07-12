<!DOCTYPE html>
<html>
<head>
	<link rel="shortcut icon" href="assets/img/favicon.ico" />
	<meta charset="utf-8">
	<meta name="author" content="AAC">
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
	<title>Amoroso Viajes y Turismo</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<link rel="stylesheet" href="assets/jquery/jquery-ui.css" />
	<link rel="stylesheet" type="text/css" href="fonts/style.css">
	<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jquerymobile/1.4.5/jquery.mobile.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquerymobile/1.4.5/jquery.mobile.min.js"></script>
	<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
	<script src="assets/jquery/jquery-ui.js"></script>
	<link rel="stylesheet" type="text/css" href="css/estilo-admin.css">
	<link rel="stylesheet" type="text/css" href="/css/responsive.css">
	<?php include 'php/Config.php';?>
</head>
<body>

<!-- BARRA DE NAVEGACION -->	
	<nav>
		<a href="#"><span class="icono-user-circle-o
"></span><?php echo 'Bienvenido '.$nombre_usuario; ?></a>
		<ul class="opciones">
			<li><a href="#" id="promo">Promociones</a></li>
			<li><a href="#" id="cli">Clientes</a></li>
			<li><a href="#" id="msj">Mensajes</a></li>
			<li><a href="#" id="list">Listados</a></li>
			<li class="red-out"><a href="php/logout.php"><span class="icono-switch"></span>Logout</a></li>
		</ul>	
	</nav>
<!-- CAMBIAR PROMOCIONES -->
	<div class="contenedor" id="promociones">
		<H3>Panel de Promociones</H3>
		<hr>
		<form enctype="multipart/form-data" action="php/config.php" method="post">
			<p><span class="icono-picture"></span>Url Imagen<input type="file" name="promo"></p>
			<p><span class="icono-earth"></span>Pais<input type="text" name="pais" placeholder="Uruguay"></p>
			<p><span class="icono-earth"></span>Ciudad<input type="text" name="ciudad" placeholder="Montevideo"></p>
			<p><span class="icono-suitcase"></span>Incluye<input type="text" name="incluye" placeholder="Aereo + Traslado + Hotel."></p>
			<p><span class="icono-tag"></span>Precio<input type="text" name="precio" placeholder="USD1000"></p>
			<input type="submit" name="btn-promo" value="Modificar">
		</form>	
	</div>
	<!-- PANEL DE CLIENTES -->
	<div class="contenedor" id="clientes">
		<H3>Panel de clientes</H3>
		<hr>
		<form>
			<p><span class="icono-user"></span>Nombre<input type="text" name="nombre" placeholder="Nombre"></p>
			<p><span class="icono-user"></span>Apellido<input type="text" name="apellido" placeholder="Apellido"></p>
			<p><span class="icono-payment"></span>Cedula/Pasaporte<input type="text" name="id" placeholder="Cedula/Pasaporte"></p>
			<p><span class="icono-phone2"></span>Telefono<input type="text" name="telefono" placeholder="Telefono"></p>
			<p><span class="icono-laptop2"></span>Email<input type="email" name="email" placeholder="Correo Electronico"></p>
			<p><span class="icono-plane2"></span>Pasajero frecuente<input type="email" name="email" placeholder="Nro Pasajero"></p>
		<H3>Tarjeta del cliente</H3>
		<hr>
		<select name="entidad">
			<option value="Visa">Visa</option>
			<option value="Master">Master</option>
			<option value="Amex">American Express</option>
			<option value="Oca">Oca</option>
			<option value="Dinners">Dinners</option>
		</select>
		<p><span class="icono-payment"></span>Numero<input type="text" name="numero" placeholder="Numero de arjeta"></p>
		<p><span class="icono-calendar4"></span>FechaV<input type="date" name="fechav" placeholder="Nombre"></p>
		<p><span class="icono-beenhere"></span>Codigo<input type="text" name="codigo" placeholder="Codigo"></p>

		<input type="submit" name="btn-promo" value="Alta Cliente">
		</form>	
		<H3>Busqueda de cliente</H3>
		<hr>
		<form>
			<p>Buscar en</p>
			<p><input type="radio" name="tabla" value="cliente">Clientes
				<input type="radio" name="tabla" value="Tarjeta">Tarjetas</p>
			<select name="filtro">
				<option value="Apellido">Apellido</option>
				<option value="Nombre">Nombre</option>
				<option value="ID">Cedula/Pasaporte</option>
			</select>
			<p><span class="icono-pencil"></span>Busqueda<input type="text" name="dato" placeholder="Ingresar dato a buscar"></p>
			<input type="submit" name="busq-cliente" value="Buscar">
		</form>
	</div>
	<!-- PANEL DE BUSQUEDA -->
	<div class="contenedor" id="listado">
		<H3>Panel de listados</H3>
		<hr>
		<form>
			<p>Traer listado de</p>
			<p><input type="radio" name="tabla" value="cliente">Clientes</p>
			<p><input type="radio" name="tabla" value="Tarjeta">Tarjetas</p>
			<p><input type="radio" name="tabla" value="news">Newsletter</p>
			<input type="submit" name="listar" value="Listar">
		</form>	
	</div>

<script src="js/javas.js"></script>		
</body>
</html>