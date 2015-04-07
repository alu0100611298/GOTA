function dia(latitud, longitud){
	var time = new Date();
	var dia = time.getDate();
	var mes = time.getMonth() + 1;
	var año = time.getFullYear();
	var hora = time.getHours();
	dia = dia - 3;
	var url = 'http://10.209.2.98/variables_request/zona4/'+latitud+'/'+longitud+'/'+año+''+addZero(mes)+''+addZero(dia)+'';
	alert(url);
	$.getJSON( url, function( data ) {
		$("#hoy").empty();
		$("#tu_lugar").text(data["lugar"]);
		/*alert(data["winds"]["dates"]);
		for(date in data["winds"]["dates"]){
			var hora = data["winds"]["dates"][date];
			var intesidad = data["winds"]["intensity"][date];
			$("#hoy").append("<li class='dia'><a href='#hora'><img src='cloud.dark.rain.png'><h1>" + hora + "</h1><h3>11º</h3><p>"+ intesidad +" km/h</p><p>0.1 mm/h</p></a></li>"); 
		}*/
		for (i = hora; i < 24; i++) {
			//alert(i);
			var hour = data["winds"]["dates"][i];
			var intesidad = (data["winds"]["intensity"][i]).toFixed(2);
			var temperatura = (data["temper"]["values"][i]).toFixed(2);
			var lluvia = data["rain"]["values"][i];
			$("#hoy").append("<li class='dia'><a href='#hora'><img src='cloud.dark.rain.png'><h1>" + hour + "</h1><h3>"+temperatura+"º</h3><p>"+intesidad+" km/h</p><p>"+lluvia+" mm/h</p></a></li>"); 
		}

		$('#hoy').listview('refresh');
	});

	dia = dia + 1;

	var url = 'http://10.209.2.98/variables_request/zona4/'+latitud+'/'+longitud+'/'+año+''+addZero(mes)+''+addZero(dia)+'';
	//alert(url);
	$.getJSON( url, function( data ) {
		
		$("#mañana").empty();

		for (i = 0; i < 13; i++) {
			//alert(i);
			var hour = data["winds"]["dates"][i];
			var intesidad = (data["winds"]["intensity"][i]).toFixed(2);
			var temperatura = (data["temper"]["values"][i]).toFixed(2);
			var lluvia = data["rain"]["values"][i];
			$("#mañana").append("<li class='dia'><a href='#hora'><img src='cloud.dark.rain.png'><h1>" + hour + "</h1><h3>"+temperatura+"º</h3><p>"+intesidad+" km/h</p><p>"+lluvia+" mm/h</p></a></li>"); 
		}
		$('#mañana').listview('refresh');
	});
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