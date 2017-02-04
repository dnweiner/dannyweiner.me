<?php
//deleteEvents_ajax.php

require "module5_database.php";

header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

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

$userid = $_SESSION['userid'];
$eventid = $_POST['eventid'];

if($_SESSION['token'] !== $_POST['token']){ //CSRF
	die("Request forgery detected");
}

$stmt = $mysqli->prepare("delete from events where eventid=? and userid=?"); //remove event in question from database
if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
}

$stmt->bind_param('ii', $eventid, $userid);
$stmt->execute();

$stmt->close();

if($userid !== null) { //make sure the current user is the one trying to delete
	echo json_encode(array(
		"success" => true
	));
	exit;
}else{
	echo json_encode(array(
		"success" => false,
		"message" => "You must be logged in to delete events."
	));
	exit;
}

?>