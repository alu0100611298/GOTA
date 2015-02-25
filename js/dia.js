function dia(){

	var time = new Date();
	var dia = time.getDate();
	var mes = time.getMonth() + 1;
	var año = time.getFullYear();
	var hora = time.getHours();
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
	$('#mañana').listview('refresh');
}