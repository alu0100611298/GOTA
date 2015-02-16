$(document).ready(function(){
	var time = new Date();
	var dia = time.getDate();
	var mes = time.getMonth() + 1;
	var año = time.getFullYear();
	var hora = time.getHours();
	for (i = hora; i < 25; i++) { 
	    //$("#date").append("<li><a href='galerias.html' rel='external'>" + dia + "/" + mes + "/" + año + "/" + i + "</a></li>");
	    //$("#date").append("<img src='imagenes/" + dia + "/" + mes + "/" + año + "/" + i + ".jpg' alt=''>");
	    //<img src="imagenes/13/2/2015/1.jpg" alt="">
	}
	$("#points").attr("value", hora);
	$("#points").attr("min", hora);
	$("#image").attr("src", "imagenes/" + dia + "/" + mes + "/" + año + "/" + hora + ".jpg");
	$("#point").change(function(){
		var valor = $("#points").val();
	    $("#image").attr("src", "imagenes/" + dia + "/" + mes + "/" + año + "/" + valor + ".jpg");
	});
});
