var host = "http://10.209.2.98/";
         
/*function doOnOrientationChange()
{
  switch(window.orientation) 
  {  
    case -90:
    case 90:
      //alert('landscape');
      break; 
    default:
      //alert('portrait');
      break; 
  }
}

window.addEventListener('orientationchange', doOnOrientationChange);

// Initial execution if needed
doOnOrientationChange();
*/
function mapas(){
  var url = host + "forecast_info/";
  url = "http://banot.etsii.ull.es/alu4213/gota/json.php";
  //alert(url);
  //Vaciamos la lista se va a volver a cargar
  $('#select-native-1').empty();
  $('#select-native-2').empty();
  $('#select-native-3').empty();
  $('#select-native-4').empty();
  $.getJSON( url, function( data ) {
      $.mobile.loading( "show", {
        text: "Cargando",
        textVisible: true,
        theme: "c",
        textonly: false,
        html: ""
      });
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
    //ultima_prediccion = select_native_1;
    $("#select-native-1").val(select_native_1);
    for (key in data[select_native_1][0]["dom_desc"]){
      $("#select-native-2").append("<option value='"+ data[select_native_1][0]["meteograma"][key] +"'>" + data[select_native_1][0]["dom_desc"][key] + "</option>"); 
    }
    for (key in data[select_native_1][0]["parametrizaciones"]){
      $("#select-native-3").append("<option value='"+ data[select_native_1][0]["parametrizaciones"][key] +"'>" + data[select_native_1][0]["parametrizaciones"][key] + "</option>"); 
    }
    for (key in data[select_native_1][0]["variables"]){
      $("#select-native-4").append("<option value='"+ data[select_native_1][0]["variables"][key] +"'>" + data[select_native_1][0]["variables"][key] + "</option>"); 
    }
    //Refrescamos el contenido del desplegable despues de cargarlo
    $('#select-native-1').selectmenu('refresh');
    $('#select-native-2').selectmenu('refresh');
    $('#select-native-3').selectmenu('refresh');
    $('#select-native-4').selectmenu('refresh');
    $("#select-native-1").change(function(){
        var select_native_1 = $('#select-native-1').val();
        //Cambiamos la seleccion borramos las listas que vamos a volver a cargar
        $('#select-native-2').empty();
        $('#select-native-3').empty();
        $('#select-native-4').empty();
        for (key in data[select_native_1][0]["meteograma"]){
          $("#select-native-2").append("<option value='"+ data[select_native_1][0]["meteograma"][key] +"'>" + data[select_native_1][0]["dom_desc"][key] + "</option>"); 
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
      //evento cargando
      $.mobile.loading( "show", {
        text: "Cargando",
        textVisible: true,
        theme: "c",
        textonly: false,
        html: ""
      });
      var valor = $("#points").val();
      var select_native_1 = $('#select-native-1').val();
      var meteograma = $('#select-native-2').val();
      var parametrizaciones = $('#select-native-3').val();
      var variables = $('#select-native-4').val();
      
      //alert(data[select_native_1][0]["fotos_url"]);
      //valor = addZero(valor);
      var hora = valor;
      var d = new Date();
      var dia = data[select_native_1][0]["fecha"];
      d.setFullYear(dia.substring(0, 4),dia.substring(4, 6),dia.substring(6, 8));
      //d = d + 1;
      d.setDate(d.getDate() + 1);
      //Si es mas de 24 horas vuelve a 0
      if(hora > 23){
        hora = hora - 24;
        d.setDate(d.getDate() + 1);
      }
      hora  = addZero(hora);
      var dia = addZero(d.getDate());
      var mes = addZero(d.getMonth());
      var anyo = d.getFullYear();
      host = "http://banot.etsii.ull.es/alu4213/gota/img.php";
      var imagen = host + "/media/demonio/imagenes/"+data[select_native_1][0]["fecha"]+"/zona"+meteograma+"/ensemble/"+variables+"/"+anyo+""+mes+""+dia+""+hora+"00.png";
      //alert(imagen);
      //$("#url").text(imagen);
      $("#hora").text("Fecha: "+anyo+""+mes+""+dia+" Hora: "+hora+":00");
      $("#image").attr("src", imagen);
      //var altura_dispositivo = $( window ).width();
      //var altura_total = altura_dispositivo * 0.95;
      //$('#image').width(altura_total);
      //alert("http://10.209.2.98/media/demonio/"+select_native_1+"/zona"+meteograma+"/"+parametrizaciones+"/"+variables+"/"+valor+".png");
        //$("#image").attr("src", "http://www.aemet.es/imagenes_d/eltiempo/observacion/satelite/" + año + "" + mes + "" + day + "" + valor + "00_s93g.gif");
    });
    //cuando la imagen acaba de cargar quitamos el icono
    $( "#image" ).load(function() {
      $.mobile.loading( "hide" );
    });
    $("#addMap").click(function(){
      $.mobile.loading( "show", {
        text: "Cargando",
        textVisible: true,
        theme: "c",
        textonly: false,
        html: ""
      });
      var select_native_1 = $('#select-native-1').val();
      var meteograma = $('#select-native-2').val();
      var parametrizaciones = $('#select-native-3').val();
      var variables = $('#select-native-4').val();
      
      //alert(data[select_native_1][0]["fotos_url"]);
      //valor = addZero(valor);
      var hora = 0;
      var d = new Date();
      var dia = data[select_native_1][0]["fecha"];
      d.setFullYear(dia.substring(0, 4),dia.substring(4, 6),dia.substring(6, 8));
      //d = d + 1;
      d.setDate(d.getDate() + 1);
      //Si es mas de 24 horas vuelve a 0
      if(hora > 23){
        hora = hora - 24;
        d.setDate(d.getDate() + 1);
      }
      hora = d.getHours();
      $("#points").attr("value", hora);
      //alert($("#points").val());
      hora  = addZero(hora);
      var dia = addZero(d.getDate());
      var mes = addZero(d.getMonth());
      var anyo = d.getFullYear();
      host = "http://banot.etsii.ull.es/alu4213/gota/img.php";
      var imagen = host + "/media/demonio/imagenes/"+data[select_native_1][0]["fecha"]+"/zona"+meteograma+"/ensemble/"+variables+"/"+anyo+""+mes+""+dia+""+hora+"00.png";
      //alert(imagen);
      //$("#url").text(imagen);
      $("#hora").text("Fecha: "+anyo+""+mes+""+dia+" Hora: "+hora+":00");
      $("#image").attr("src", imagen);
      //Recojo el indice de la variable
      var index = data[select_native_1][0]["variables"].indexOf(variables);
      //Uso el indice para conocer el incremento de la variable
      var step = data[select_native_1][0]["inc_variables"][index];
      //Cambio el atributo del input radio por el salto correspondiente a la variable
      $("#points").attr("step", step);
    });
    $.mobile.loading( "hide" );
  })
  //Error de conexion con el servidor al buscar el fichero json
  .fail(function( jqxhr, textStatus, error ) {
      var err = textStatus + ", " + error;
      console.log( "Request Failed: " + err );
      alert("No se pudo conectar con el servidor, intentelo más tarde.");
      //Si ocurre un error redirige a la página principal
      $.mobile.navigate( "#pageone" );
  });
}

//Añade un 0 a la variable a la hora de mostrar la hora
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}