// Fichero que contiene las funciones de la evolución temporal
//Se le pasa una locaclización y se carga su predicción temporal
function dia(latitud, longitud){
	// Pasamos a la página dia
	$.mobile.navigate( "#dia" );
	// Vaciamos el listado
	$("#hoy").empty();
	// La dirección donde esta el fichero
	var url = "http://banot.etsii.ull.es/alu4213/gota/json.php";
	var ultima_fecha;
	// Obtenemos el JSON
	$.getJSON( url, function( data ) {
	// Simbolo de carga
	$.mobile.loading( "show", {
        text: "Cargando",
        textVisible: true,
        theme: "c",
        textonly: false,
        html: ""
      });
		var ultima_prediccion;
		var fechas = [];
		//Meto las fechas de las predicciones en el array de fechas
		for (key in data){
		  fechas.push(key);
		}
		//Ordeno el array
		fechas.sort();
		//Le doi la vuelta la úlima es la primera
		fechas.reverse();
		ultima_prediccion = fechas[0];
		//alert(ultima_prediccion);
		ultima_fecha = data[ultima_prediccion][0]["fecha"];
		
		// Obtenemos la fecha, dia, mes y hora
		var time = new Date();
		var dia = time.getDate();
		var mes = time.getMonth() + 1;
		var año = time.getFullYear();
		var hora = time.getHours();
		dia = dia - 1;
		// Comprobamos a que zona pertenece
		var Zona = zona(latitud,longitud);
		// Contruimos la URL de la peticion
		url = host + '/variables_request/zona'+Zona+'/'+latitud+'/'+longitud+'/'+ultima_fecha+'';
		// Dirección del servidor puente
		host = "http://banot.etsii.ull.es/alu4213/gota/url.php";
		// Peticion con la URL del servidor puente mas la consulta
		url = host + '/variables_request/zona'+Zona+'/'+latitud+'/'+longitud+'/'+ultima_fecha+'';
		// Obtenemos la predicción
		$.getJSON( url, function( data ) {
			// Nombre del lugar
			$("#tu_lugar").text(data["lugar"]);
			// Para las horas disponibles recorremos el vector
			var tam = data["dates"].length;
			for (i = hora; i < tam; i++) {
				// Mostramos las diferentes variables
				var hour = data["dates"][i];
				var intesidad = (data["winds"]["intensity"][i]).toFixed(1);
				var direccion = data["winds"]["direction"][i];
				var temperatura = (data["temper"]["values"][i]).toFixed(1);
				var lluvia = (data["rain"]["values"][i]).toFixed(1);
				var nubosidad = (data["cloud"]["values"][i]).toFixed(0);
				var brujula = obtener_direccion(direccion);
				// Se van introduciendo al final de la lista
				$("#hoy").append("<li class='dia'><img src='imagen_"+nubosidad+".png'><h1>" + hour + "</h1><h3><img class='icono' src='thermometer.png'> "+temperatura+"º</h3><h3><img class='icono' src='"+brujula+".png'> "+brujula+": "+intesidad+" km/h </h3><h3><img class='icono' src='gota.png'> "+lluvia+" mm/h </h3></li>");  
			}
			// Se refresca la lista para que coja el estilo
			$('#hoy').listview('refresh');
			// Escondemos la carga
			$.mobile.loading( "hide" );
		})
		.fail(function( jqxhr, textStatus, error ) {
			// Mensaje de error por si falla la carga del fichero JSON
			var err = textStatus + ", " + error;
			console.log( "Request Failed: " + err );
			alert("No se pudo conectar con el servidor, intentelo más tarde.");
			$.mobile.navigate( "#pageone" );
		});
	})
	.fail(function( jqxhr, textStatus, error ) {
	// Mensaje de error por si falla la carga del fichero JSON
      var err = textStatus + ", " + error;
      console.log( "Request Failed: " + err );
      alert("No se pudo conectar con el servidor, intentelo más tarde.");
      $.mobile.navigate( "#pageone" );
  	});
}
// Funcion que obtiene la dirección del viento segun en el grado que esté
function obtener_direccion(direction){
	var coordenada;
	while(direction > 0){
		direction = direction - 360;
	}
	while(direction < -360){
		direction = direction + 360;
	}
	if(direction < -390){
		coordenada = "La dirección es menor -360º";
	}else if(direction < -337.5){
		coordenada = "N";
	}else if(direction < -292.5){
		coordenada = "NE";
	}else if(direction < -247.5){
		coordenada = "E";
	}else if(direction < -202.5){
		coordenada = "SE";
	}else if(direction < -157.5){
		coordenada = "S";
	}else if(direction < -112.5){
		coordenada = "SO";
	}else if(direction < -67.5){
		coordenada = "O";
	}else if(direction < -22.5){
		coordenada = "NO";
	}else if(direction < 0){
		coordenada = "N";
	}else{
		coordenada = "El número es positivo";
	}
	return coordenada;
}
// Devuelve la zona para la consulta a travez de la ubicación
function zona(latitud,longitud){

	var zona;

	if(longitud > -17 && longitud < -16 && latitud > 28 && latitud < 28.6){
		var zona = 4;
	}else if(longitud > -18.2 && longitud < -16 && latitud > 27.5 && latitud < 29){
		var zona = 3;
	}else if(longitud > -18.5 && longitud < -12.5 && latitud > 27.5 && latitud < 29.5){
		var zona = 2;
	}else{
		// Si la zona no esta dentro del límite se devuelve un mensaje de error
		var zona = -1;
		alert("La zona está fuera de los límites");
	}
	return zona;
}