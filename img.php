<?php
/*header('Access-Control-Allow-Origin: *');*/
$r = $_SERVER['REQUEST_URI']; 
$r = explode('/', $r);
//print_r ($r);
$url = "http://10.209.2.98/".$r[4]."/".$r[5]."/".$r[6]."/".$r[7]."/".$r[8]."/".$r[9]."/".$r[10]."/".$r[11]."";
//echo ($url);
header('Content-Type: image/jpeg');
//readfile('$url');
$json = file_get_contents($url);
echo ($json);
?>