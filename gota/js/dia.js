function dia(latitud, longitud){

	var url = host + "forecast_info/";
	var ultima_fecha;
	$.getJSON( url, function( data ) {
		var ultima_prediccion;
		var fechas = [];
		//Meto las fechas de las predicciones en el arry de fechas
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
		

		var time = new Date();
		var dia = time.getDate();
		var mes = time.getMonth() + 1;
		var año = time.getFullYear();
		var hora = time.getHours();
		dia = dia - 1;
		var Zona = zona(latitud,longitud);
		
		//var url = host + 'variables_request/zona'+Zona+'/'+latitud+'/'+longitud+'/'+año+''+addZero(mes)+''+addZero(dia)+'';
		url = host + 'variables_request/zona'+Zona+'/'+latitud+'/'+longitud+'/'+ultima_fecha+'';
		//alert(url);
		$.getJSON( url, function( data ) {
			$("#hoy").empty();
			$("#tu_lugar").text(data["lugar"]);
			var tam = data["dates"].length;
			for (i = hora; i < tam; i++) {
				//alert(i);
				var hour = data["dates"][i];
				var intesidad = (data["winds"]["intensity"][i]).toFixed(2);
				var direccion = data["winds"]["direction"][i];
				var temperatura = (data["temper"]["values"][i]).toFixed(2);
				var lluvia = (data["rain"]["values"][i]).toFixed(2);
				var nubosidad = (data["cloud"]["values"][i]).toFixed(0);
				//$("#hoy").append("<li class='dia'><a href='#hora'><img src='imagen_"+nubosidad+".png'><h1>" + hour + "</h1><h3>"+temperatura+"º</h3><p>"+intesidad+" km/h "+obtener_direccion(direccion)+"</p><p>"+lluvia+" mm/h</p></a></li>");
				$("#hoy").append("<li class='dia'><img src='imagen_"+nubosidad+".png'><h1>" + hour + "</h1><h3>"+temperatura+"º</h3><p>"+intesidad+" km/h "+obtener_direccion(direccion)+"</p><p>"+lluvia+" mm/h</p></li>");  
			}

			$('#hoy').listview('refresh');
		})
		.fail(function( jqxhr, textStatus, error ) {
			var err = textStatus + ", " + error;
			console.log( "Request Failed: " + err );
			alert("No se pudo conectar con el servidor, intentelo más tarde.");
			$.mobile.navigate( "#pageone" );
		});
	})
	.fail(function( jqxhr, textStatus, error ) {
      var err = textStatus + ", " + error;
      console.log( "Request Failed: " + err );
      alert("No se pudo conectar con el servidor, intentelo más tarde.");
      $.mobile.navigate( "#pageone" );
  	});
}

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

function zona(latitud,longitud){

	var zona;

	if(longitud > -17 && longitud < -16 && latitud > 28 && latitud < 28.6){
		var zona = 4;
	}else if(longitud > -18.2 && longitud < -16 && latitud > 27.5 && latitud < 29){
		var zona = 3;
	}else if(longitud > -18.5 && longitud < -12.5 && latitud > 27.5 && latitud < 29.5){
		var zona = 2;
	}else{
		var zona = -1;
		alert("La zona está fuera de los límites");
	}
	return zona;
}