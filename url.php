<?php
/*header('Access-Control-Allow-Origin: *');*/
$r = $_SERVER['REQUEST_URI']; 
$r = explode('/', $r);
$url = "http://10.209.2.98/".$r[4]."/".$r[5]."/".$r[6]."/".$r[7]."/".$r[8]."";
$json = file_get_contents($url);
echo ($json);
?>