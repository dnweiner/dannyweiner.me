<?php
require 'module5_database.php';

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

if($_SESSION['token'] !== $_POST['token']){ //csrf
	die("Request forgery detected");
}

$userid = $_SESSION['userid'];

$event_name = $_POST['eventName'];
$event_date = $_POST['eventDate'];
$event_time = $_POST['eventTime'];
$weekly = $_POST['weekly'];
$event_descript = $_POST['eventDescript'];

 
if( !preg_match('/^[\w_\s\-\'\!\*]+$/', $event_name) ){ //doublecheck validity of entered name
  	echo json_encode(array(
		"success" => false,
		"message" => "Invalid event name."
	));
	exit;
}

$stmt = $mysqli->prepare("insert into events (userid, eventname, event_date, event_time, weekly, event_descript) values (?, ?, ?, ?, ?, ?)"); //add a new event to the database, associated with current user
if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
}

$stmt->bind_param('isssis', $userid, $event_name, $event_date, $event_time, $weekly, $event_descript);
$stmt->execute();

$stmt->close();

if($userid !== null) {
	echo json_encode(array(
		"success" => true
	));
	exit;
}else{
	echo json_encode(array(
		"success" => false,
		"message" => "Only registered users may add events"
	));
	exit;
}

?>