/*$(document).ready(function(){
});
$.getJSON( "http://10.209.2.98/variables_request/zona4/28.4108/-16.464/20150324/", function( data ) {
  alert(data["lugar"]);
  alert(data["prediccion20150322"][0]["meteograma"][0]);
});

$.getJSON( "http://10.209.2.98/media/demonio/prediccion_prueba2.json", function( data ) {
  alert(data["prediccion20150322"][0]["meteograma"][0]);
});*/

$(document).ready(function(){
  $.getJSON( "js/prediccion_prueba2.json", function( data ) {
    for (key in data){
      $("#select-native-1").append("<option value='"+ key +"'>" + key + "</option>"); 
      //alert(key);
    }
    $('#select-native-1').selectmenu('refresh');
    //alert(Object.keys(data));
    var select_native_1 = $('#select-native-1').val();
    //alert(select_native_1);
    //alert(data[select_native_1][0]);
    //alert(Object.keys(data[select_native_1][0]["meteograma"]));
    for (key in data[select_native_1][0]["meteograma"]){
      $("#select-native-2").append("<option value='"+ data[select_native_1][0]["meteograma"][key] +"'>" + data[select_native_1][0]["meteograma"][key] + "</option>"); 
      //alert(key);
    }
    $('#select-native-2').selectmenu('refresh');
    for (key in data[select_native_1][0]["parametrizaciones"]){
      $("#select-native-3").append("<option value='"+ data[select_native_1][0]["parametrizaciones"][key] +"'>" + data[select_native_1][0]["parametrizaciones"][key] + "</option>"); 
      //alert(key);
    }
    $('#select-native-3').selectmenu('refresh');
    for (key in data[select_native_1][0]["variables"]){
      $("#select-native-4").append("<option value='"+ data[select_native_1][0]["variables"][key] +"'>" + data[select_native_1][0]["variables"][key] + "</option>"); 
      //alert(key);
    }
    $('#select-native-4').selectmenu('refresh');
  });
});

function addMap(){
  var time = new Date();
  var dia = addZero(time.getDate() - 1);
  var mes = addZero(time.getMonth() + 1);
  var año = time.getFullYear();
  var hora = time.getHours();

  var select_native_1 = $('#select-native-1').val();
  var meteograma = $('#select-native-2').val();
  var parametrizaciones = $('#select-native-3').val();
  var variables = $('#select-native-4').val();

  $.getJSON( "js/prediccion_prueba2.json", function( data ) {

  });
  
  //hora = 0;
  $("#points").attr("value", hora);
  $("#points").attr("min", hora);
  hora = addZero(hora);
  $("#hora").text("Fecha: " + dia + "/" + mes + "/" + año + " Hora: " + hora + ":00");
  alert("http://10.209.2.98/media/demonio/imagenes/20150328/zona"+meteograma+"/"+parametrizaciones+"/"+variables+"/"+hora+".png");
  $("#image").attr("src", "http://10.209.2.98/media/demonio/imagenes/20150327/zona"+meteograma+"/"+parametrizaciones+"/"+variables+"/"+hora+".png");
  //$("#image").attr("src", "http://www.aemet.es/imagenes_d/eltiempo/observacion/satelite/" + año + "" + mes + "" + dia + "" + hora + "00_s93g.gif");
  $("#point").change(function(){
    var valor = $("#points").val();
    var day = dia;
    if (valor > 23) {
          valor = valor - 24;
          day = dia + 1;
      }
    valor = addZero(valor);
    $("#hora").text("Fecha: " + dia + "/" + mes + "/" + año + " Hora: " + valor + ":00");
      $("#image").attr("src", "http://10.209.2.98/media/demonio/imagenes/20150327/zona"+meteograma+"/"+parametrizaciones+"/"+variables+"/"+valor+".png");
      //$("#image").attr("src", "http://www.aemet.es/imagenes_d/eltiempo/observacion/satelite/" + año + "" + mes + "" + day + "" + valor + "00_s93g.gif");
  });
}
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function addMap_old(){
	var time = new Date();
	var dia = addZero(time.getDate() - 1);
	var mes = addZero(time.getMonth() + 1);
	var año = time.getFullYear();
	var hora = time.getHours();
	//hora = 0;
	$("#points").attr("value", hora);
	$("#points").attr("min", hora);
	hora = addZero(hora);
	$("#hora").text("Fecha: " + dia + "/" + mes + "/" + año + " Hora: " + hora + ":00");
	$("#image").attr("src", "http://www.aemet.es/imagenes_d/eltiempo/observacion/satelite/" + año + "" + mes + "" + dia + "" + hora + "00_s93g.gif");
	$("#point").change(function(){
		var valor = $("#points").val();
		var day = dia;
		if (valor > 23) {
	        valor = valor - 24;
	        day = dia + 1;
	    }
		valor = addZero(valor);
		$("#hora").text("Fecha: " + dia + "/" + mes + "/" + año + " Hora: " + valor + ":00");
	    $("#image").attr("src", "http://www.aemet.es/imagenes_d/eltiempo/observacion/satelite/" + año + "" + mes + "" + day + "" + valor + "00_s93g.gif");
	});
}
