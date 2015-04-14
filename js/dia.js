function dia(latitud, longitud){
	var time = new Date();
	var dia = time.getDate();
	var mes = time.getMonth() + 1;
	var año = time.getFullYear();
	var hora = time.getHours();
	dia = dia - 1;
	var Zona = zona(latitud,longitud);
	var url = host + 'variables_request/zona'+Zona+'/'+latitud+'/'+longitud+'/'+año+''+addZero(mes)+''+addZero(dia)+'';
	//alert(url);
	$.getJSON( url, function( data ) {
		$("#hoy").empty();
		$("#tu_lugar").text(data["lugar"]);
		/*alert(data["winds"]["dates"]);
		for(date in data["winds"]["dates"]){
			var hora = data["winds"]["dates"][date];
			var intesidad = data["winds"]["intensity"][date];
			$("#hoy").append("<li class='dia'><a href='#hora'><img src='cloud.dark.rain.png'><h1>" + hora + "</h1><h3>11º</h3><p>"+ intesidad +" km/h</p><p>0.1 mm/h</p></a></li>"); 
		}*/
		var tam = data["winds"]["dates"].length;
		for (i = hora; i < tam; i++) {
			//alert(i);
			var hour = data["winds"]["dates"][i];
			var intesidad = (data["winds"]["intensity"][i]).toFixed(2);
			var direccion = data["winds"]["direction"][i];
			var temperatura = (data["temper"]["values"][i]).toFixed(2);
			//La lluvia dividida entre 3 dado que son cada 3 horas
			var lluvia = "";
			if(! (data["rain"]["values"][i])){
				lluvia = "No está definida";
			}else{
				lluvia = (data["rain"]["values"][i]).toFixed(2);
			}
			$("#hoy").append("<li class='dia'><a href='#hora'><img src='cloud.dark.rain.png'><h1>" + hour + "</h1><h3>"+temperatura+"º</h3><p>"+intesidad+" km/h "+obtener_direccion(direccion)+"</p><p>"+lluvia+" mm/h</p></a></li>"); 
		}

		$('#hoy').listview('refresh');
	});
/*
	dia = dia + 1;

	var url = host + 'variables_request/zona4/'+latitud+'/'+longitud+'/'+año+''+addZero(mes)+''+addZero(dia)+'';
	//alert(url);
	$.getJSON( url, function( data ) {
		
		$("#mañana").empty();

		for (i = 0; i < 25; i++) {
			//alert(i);
			var hour = data["winds"]["dates"][i];
			var intesidad = (data["winds"]["intensity"][i]).toFixed(2);
			var temperatura = (data["temper"]["values"][i]).toFixed(2);
			var lluvia = (data["rain"]["values"][Math.floor(i/3)]).toFixed(2);
			$("#mañana").append("<li class='dia'><a href='#hora'><img src='cloud.dark.rain.png'><h1>" + hour + "</h1><h3>"+temperatura+"º</h3><p>"+intesidad+" km/h</p><p>"+lluvia+" mm/h</p></a></li>"); 
		}
		$('#mañana').listview('refresh');
	});*/
	/*
	for (i = hora; i < 24; i++) {
		$("#hoy").append("<li class='dia'><a href='#hora'><img src='cloud.dark.rain.png'><h1>" + i + ":00</h1><h3>11º</h3><p>18 km/h</p><p>0.1 mm/h</p></a></li>"); 
		//$("#hoy").append("<li class='dia'><a href=''><img src='cloud.dark.rain.png'  class='ui-li-icon' ><h1>" + i + ":00</h1><p>Lluvia</p></a></li>"); 
	    //$("#hoy").append("<li>" + dia + "/" + mes + "/" + año + "/" + i + "</li>");
	    //$("#date").append("<img src='imagenes/" + dia + "/" + mes + "/" + año + "/" + i + ".jpg' alt=''>");
	    //<img src="imagenes/13/2/2015/1.jpg" alt="">
	}

	dia = dia + 1;
	for (i = 0; i < 13; i++) {
		$("#mañana").append("<li class='dia'><a href='#hora'><img src='cloud.dark.rain.png'><h1>" + i + ":00</h1><h3>11º</h3><p>18 km/h</p><p>0.1 mm/h</p></a></li>"); 
	}
	$('#hoy').listview('refresh');
	$('#mañana').listview('refresh');*/
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