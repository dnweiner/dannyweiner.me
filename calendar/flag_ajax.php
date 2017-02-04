<?php
//flag_ajax.php

require "module5_database.php";

header("Content-Type: application/json");

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

if($_SESSION['token'] !== $_POST['token']){ //CSRF
	die("Request forgery detected");
}

//$token = $_SESSION['token'];
$eventid = $_POST['eventid'];
$userid = $_SESSION['userid'];
$flagged = $_POST['flagged'];

$stmt = $mysqli->prepare("update events set flagged=? where eventid= ? and userid=?");
    
$stmt->bind_param('iii', $flagged, $eventid, $userid);
$stmt->execute();
    
$stmt->close();


if($userid !== null) { //check that a registered user is modifying things here
	echo json_encode(array(
		"success" => true
	));
	exit;
}else{
	echo json_encode(array(
		"success" => false,
		"message" => "You must be logged in to flag events."
	));
	exit;
}
?>