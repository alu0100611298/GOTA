// Fichero para el modulo de los mapas de predicción
// Eventos si el dispositivo cambia de dirección entre vertical y horizontal      
function doOnOrientationChange()
{
  switch(window.orientation) 
  {  
    case -90:
    case 90:
    // Clases para el dispositivo en horizontal
      $("#point").addClass("point");
      $("#hora").addClass("hora");
      $("#portrait").addClass("hora");
      $("#header").addClass("hora");
      $("#footer").addClass("hora");
      $("#image").addClass("image");
      break; 
    default:
    // En vertical se tienen estas clases
      $("#point").removeClass("point");
      $("#hora").removeClass("hora");
      $("#portrait").removeClass("hora");
      $("#header").removeClass("hora");
      $("#footer").removeClass("hora");
      $("#image").removeClass("image");
      break; 
  }
}
// Evento para el cambio de posición
window.addEventListener('orientationchange', doOnOrientationChange);

// Initial execution if needed
doOnOrientationChange();
function mapas(){
  // URL del fichero
  var url  "http://banot.etsii.ull.es/alu4213/gota/json.php";
  //Vaciamos la lista se va a volver a cargar
  $('#select-native-1').empty();
  $('#select-native-2').empty();
  $('#select-native-3').empty();
  $('#select-native-4').empty();
  // Obtenemos el fichero
  $.getJSON( url, function( data ) {
      // Imagen que muestra el dispositivo cargando
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
    // Coloca la ultima fecha primero y la muestro
    select_native_1 = fechas[0];
    $("#select-native-1").val(select_native_1);
    // Listado de dominios
    for (key in data[select_native_1][0]["dom_desc"]){
      $("#select-native-2").append("<option value='"+ data[select_native_1][0]["meteograma"][key] +"'>" + data[select_native_1][0]["dom_desc"][key] + "</option>"); 
    }
    // Listado de parametrizaciones
    for (key in data[select_native_1][0]["parametrizaciones"]){
      $("#select-native-3").append("<option value='"+ data[select_native_1][0]["parametrizaciones"][key] +"'>" + data[select_native_1][0]["parametrizaciones"][key] + "</option>"); 
    }
    // Listado de variables
    for (key in data[select_native_1][0]["variables"]){
      $("#select-native-4").append("<option value='"+ data[select_native_1][0]["variables"][key] +"'>" + data[select_native_1][0]["variables"][key] + "</option>"); 
    }
    //Refrescamos el contenido del desplegable despues de cargarlo
    $('#select-native-1').selectmenu('refresh');
    $('#select-native-2').selectmenu('refresh');
    $('#select-native-3').selectmenu('refresh');
    $('#select-native-4').selectmenu('refresh');
    // Cuando cambia la fecha volvemos a cambiar las otras variables
    $("#select-native-1").change(function(){
        var select_native_1 = $('#select-native-1').val();
        //Cambiamos la seleccion borramos las listas que vamos a volver a cargar
        $('#select-native-2').empty();
        $('#select-native-3').empty();
        $('#select-native-4').empty();
        for (key in data[select_native_1][0]["meteograma"]){
          $("#select-native-2").append("<option value='"+ data[select_native_1][0]["meteograma"][key] +"'>" + data[select_native_1][0]["dom_desc"][key] + "</option>"); 
        }
        $('#select-native-2').selectmenu('refresh');
        for (key in data[select_native_1][0]["parametrizaciones"]){
          $("#select-native-3").append("<option value='"+ data[select_native_1][0]["parametrizaciones"][key] +"'>" + data[select_native_1][0]["parametrizaciones"][key] + "</option>"); 
        }
        $('#select-native-3').selectmenu('refresh');
        for (key in data[select_native_1][0]["variables"]){
          $("#select-native-4").append("<option value='"+ data[select_native_1][0]["variables"][key] +"'>" + data[select_native_1][0]["variables"][key] + "</option>"); 
        }
        $('#select-native-4').selectmenu('refresh');
    });
    // Cuando cambia la hora en el slider
    $("#point").change(function(){
      //evento cargando
      $.mobile.loading( "show", {
        text: "Cargando",
        textVisible: true,
        theme: "c",
        textonly: false,
        html: ""
      });
      // Obtenemos el valor y las variables
      var valor = $("#points").val();
      var select_native_1 = $('#select-native-1').val();
      var meteograma = $('#select-native-2').val();
      var parametrizaciones = $('#select-native-3').val();
      var variables = $('#select-native-4').val();
      var hora = valor;
      var d = new Date();
      var dia = data[select_native_1][0]["fecha"];
      d.setFullYear(dia.substring(0, 4),dia.substring(4, 6),dia.substring(6, 8));
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
      // Dirección del servidor puente
      host = "http://banot.etsii.ull.es/alu4213/gota/img.php";
      // URL de la imagen
      var imagen = host + "/media/demonio/imagenes/"+data[select_native_1][0]["fecha"]+"/zona"+meteograma+"/ensemble/"+variables+"/"+anyo+""+mes+""+dia+""+hora+"00.png";
      // Cargamos la fecha la hora y la imagen
      $("#hora").text("Fecha: "+anyo+""+mes+""+dia+" Hora: "+hora+":00");
      $("#image").attr("src", imagen);
    });
    //cuando la imagen acaba de cargar quitamos el icono
    $( "#image" ).load(function() {
      $.mobile.loading( "hide" );
    });
    // Cargamos los datos al seleccinar el link
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

      var hora = 0;
      var d = new Date();
      var dia = data[select_native_1][0]["fecha"];
      d.setFullYear(dia.substring(0, 4),dia.substring(4, 6),dia.substring(6, 8));

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