<?php

ini_set("session.cookie_httponly", 1);

session_name("cococalendar");

session_start();

$previous_ua = @$_SESSION['useragent'];
$current_ua = $_SERVER['HTTP_USER_AGENT'];
 
if(isset($_SESSION['useragent']) && $previous_ua !== $current_ua){
	die("Session hijack detected");
}else{
	$_SESSION['useragent'] = $current_ua;
}

//if($_SESSION['token'] !== $_POST['token']){ //CSRF
//	die("Request forgery detected");
//}

session_destroy();

//if(empty($_SESSION)){
	echo json_encode(array(
		"success" => true
	));
	exit;
//}else{
//	echo json_encode(array(
//		"success" => false,
//		//"message" => session_status()
//	));
//	exit;
//}
?>