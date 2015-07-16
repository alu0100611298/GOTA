<?php
// Se obtiene la URI
$r = $_SERVER['REQUEST_URI']; 
// La separamos por las barras y la volvemos a construir para hacer la petición al servidor
$r = explode('/', $r);
$url = "http://10.209.2.98/".$r[4]."/".$r[5]."/".$r[6]."/".$r[7]."/".$r[8]."";
// Obtenemos el fichero
$json = file_get_contents($url);
// Se devuelve
echo ($json);
?>