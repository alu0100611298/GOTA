<?php
/*header('Access-Control-Allow-Origin: *');*/ 
$url = "http://10.209.2.98/media/demonio/prediccion_prueba2.json";
$json = file_get_contents($url);
echo ($json);
?>