<?php
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

$userid = $_SESSION['userid'];

$eventid = $_POST['eventid'];
$oldname = $_POST['old_name'];
$olddate = $_POST['old_date'];
$oldtime = $_POST['old_time'];
$olddescript = $_POST['old_descript'];

$newname = $_POST['new_name']; 
$newdate = $_POST['new_date'];
$newtime = $_POST['new_time'];
$newdescript = $_POST['new_descript'];

if($newname == "" || $newname == null) { //if a new name wasn't entered
	$newname = $oldname; //we're "renaming" to the original name, but updating another field
}


if( !preg_match('/^[\w_\s\-\'\!\*]+$/', $newname) ){ //check validity of name before updating database
	echo json_encode(array(
		"success" => false,
		"message" => "Invalid event name"
	));
	exit;
}

if($newdate == "" || $newdate == null) { //if a new date wasn't entered
	$newdate = $olddate; //we're "reassigning" to the original date, but updating another field
}

if($newtime == "" || $newtime == null) { //if a new time wasn't entered
	$newtime = $oldtime; //we're "reassigning" to the original time, but updating another field
}

if($newdescript == "" || $newdescript == null) {
	$newdescript = $olddescript;
}

$stmt = $mysqli->prepare("update events set eventname=?, event_date=?, event_time=?, event_descript=? where eventid= ? and userid=?");
    
$stmt->bind_param('ssssii', $newname, $newdate, $newtime, $newdescript, $eventid, $userid);
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
		"message" => "You must be logged in to modify events."
	));
	exit;
}
?>