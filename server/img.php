<?php
//Se obtiene la URI
$r = $_SERVER['REQUEST_URI'];
//Se separa por las barras 
$r = explode('/', $r);
//Se vuelve a construir la URI para la consulta
$url = "http://10.209.2.98/".$r[4]."/".$r[5]."/".$r[6]."/".$r[7]."/".$r[8]."/".$r[9]."/".$r[10]."/".$r[11]."";
header('Content-Type: image/jpeg');
// Se obtiene el mapa
$json = file_get_contents($url);
// Se devuelve
echo ($json);
?>