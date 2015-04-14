var host = "http://10.209.2.98/";

$(document).ready(function(){
  var url = host + "forecast_info/";
  $.getJSON( url, function( data ) {
    var select_native_1;
    var ultima_prediccion;
    var fechas = [];
    //Meto las fechas de las predicciones en el arry de fechas
    for (key in data){
      fechas.push(key);
    }
    //Ordeno el array
    fechas.sort();
    fechas.reverse();
    //Imprimo los valores de las fechas en select
    for (key in fechas){
      $("#select-native-1").append("<option value='"+ fechas[key] +"'>" + fechas[key] + "</option>");
    }
    select_native_1 = fechas[0];
    ultima_prediccion = select_native_1;
    $("#select-native-1").val(select_native_1);
    for (key in data[select_native_1][0]["meteograma"]){
      $("#select-native-2").append("<option value='"+ data[select_native_1][0]["meteograma"][key] +"'>" + data[select_native_1][0]["meteograma"][key] + "</option>"); 
      //alert(key);
    }
    //$('#select-native-2').selectmenu('refresh');
    for (key in data[select_native_1][0]["parametrizaciones"]){
      $("#select-native-3").append("<option value='"+ data[select_native_1][0]["parametrizaciones"][key] +"'>" + data[select_native_1][0]["parametrizaciones"][key] + "</option>"); 
      //alert(key);
    }
    //$('#select-native-3').selectmenu('refresh');
    for (key in data[select_native_1][0]["variables"]){
      $("#select-native-4").append("<option value='"+ data[select_native_1][0]["variables"][key] +"'>" + data[select_native_1][0]["variables"][key] + "</option>"); 
      //alert(key);
    }
    //$('#select-native-4').selectmenu('refresh');
    $("#select-native-1").change(function(){
        var select_native_1 = $('#select-native-1').val();
        $('#select-native-2').empty();
        $('#select-native-3').empty();
        $('#select-native-4').empty();
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

    $("#point").change(function(){
        var valor = $("#points").val();
        var select_native_1 = $('#select-native-1').val();
        var meteograma = $('#select-native-2').val();
        var parametrizaciones = $('#select-native-3').val();
        var variables = $('#select-native-4').val();
        
        //alert(data[select_native_1][0]["fotos_url"]);
        valor = addZero(valor);
        var hora = valor
        //Si es mas de 24 horas vuelve a 0
        if(hora > 23){
          hora = hora - 24;
          //Si pasa un dia y no es la ultima predicción
          if(ultima_prediccion != select_native_1){
            var index = fechas.indexOf(select_native_1);
            select_native_1 = fechas[index - 1];
          }
        }
        var imagen = host + "media/demonio/"+data[select_native_1][0]["fotos_url"]+"zona"+meteograma+"/"+parametrizaciones+"/"+variables+"/"+valor+".png";
        $("#url").text(imagen);
        $("#hora").text("Fecha: "+select_native_1+" Hora: "+hora+":00");
        $("#image").attr("src", imagen);
        //alert("http://10.209.2.98/media/demonio/"+select_native_1+"/zona"+meteograma+"/"+parametrizaciones+"/"+variables+"/"+valor+".png");
          //$("#image").attr("src", "http://www.aemet.es/imagenes_d/eltiempo/observacion/satelite/" + año + "" + mes + "" + day + "" + valor + "00_s93g.gif");
      });
      $("#addMap").click(function(){
        var valor = $("#points").val();
        var select_native_1 = $('#select-native-1').val();
        var meteograma = $('#select-native-2').val();
        var parametrizaciones = $('#select-native-3').val();
        var variables = $('#select-native-4').val();
        
        //alert(data[select_native_1][0]["fotos_url"]);
        valor = addZero(valor);
        var imagen = host + "media/demonio/"+data[select_native_1][0]["fotos_url"]+"zona"+meteograma+"/"+parametrizaciones+"/"+variables+"/"+valor+".png";
        $("#url").text(imagen);
        $("#hora").text("Hora: "+valor+":00");
        $("#image").attr("src", imagen);
        //Recojo el indice de la variable
        var index = data[select_native_1][0]["variables"].indexOf(variables);
        //Uso el indice para conocer el incremento de la variable
        var step = data[select_native_1][0]["inc_variables"][index];
        //Cambio el atributo del input radio por el salto correspondiente a la variable
        $("#points").attr("step", step);
      });
  });
});


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
