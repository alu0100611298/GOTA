// Fichero que contiene las funciones para el módulo de favoritos
function favoritos(){
	// Limpiamos el listado
	$("#favorito").empty();
	var localizacion = localStorage.getItem('favoritos') || '<empty>';
	// Convertimos la variable a JSON para trabajar con ella como array
	var obj = JSON.parse(localizacion);
	// Recuperamos el tamaño del objeto para poder iterar en el
	var tam = obj["favoritos"].length;
	for (i = 0; i < tam; i++) {
		var lugar = obj["favoritos"][i]["lugar"];
		var latitud = obj["favoritos"][i]["latitud"];
		var longitud = obj["favoritos"][i]["longitud"];
		$("#favorito").append("<li><a href='#dia' onclick='dia("+ latitud +","+ longitud +");'><img src='heart.png'><h2>"+lugar+"</h2><p>Selecciona para mostrar</p></a></li>");
	}
	// Refrescamos la lista
	$('#favorito').listview('refresh');
}
// Se añaden los favoritos a la lista
function favoritos_add(latitud,longitud){
	//recogemos la lista del almacenamiento local
	var lugar = prompt("Introduzca un nombre para la localización", "localización");
	var localizacion = localStorage.getItem('favoritos');
	var obj = [];
	// No hay variable almacenada se crea el array
	if(!localizacion){
		var favoritos = '{ "favoritos" : []}';
		obj = JSON.parse(favoritos);
	}else{// La variable si existe y se transforma en un objeto para trabajar
		obj = JSON.parse(localizacion);
	}
	//Obtenemos el tamaño del array
	var tam = obj["favoritos"].length;
	// Text son los datos que vamos a guardar necesarios para mostrar el lugar
	var text = { "lugar":lugar , "latitud":latitud , "longitud":longitud };
	// El tamaño de la lista de favoritos es 3 si hay menos se inserta
	if(tam < 3){
		obj["favoritos"].unshift(text);
	}else{ // si hay mas de 3 elementos se borra el ultimo y se inserta por delante
		obj["favoritos"].pop();
		obj["favoritos"].unshift(text);
	}
	// Se vuele a pasar el objeto a una cadena
	var favoritos = JSON.stringify(obj);
	// Se almacena la cadena en local
	localStorage.setItem("favoritos", favoritos);
}