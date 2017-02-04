<?php
// connect to relevant database. nothing else happens here

$mysqli = new mysqli('localhost', 'module5login', '5login', 'module5');
 
if($mysqli->connect_errno) {
	printf("Connection Failed: %s\n", $mysqli->connect_error);
	exit;
}


?>