<?php
require 'module5_database.php';

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

$userid = $_SESSION['userid'];

$stmt = $mysqli->prepare("select eventname, event_date, event_time, eventid, event_descript, weekly, flagged from events where userid=?");
if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
}

$stmt->bind_param("i", $userid);
$stmt->execute();
$result = $stmt->get_result();

$sendArray = array("success" => true);
$eventids = ''; //begin a string to carry over eventids for indexing
while($row = $result->fetch_assoc()) {
	$eventids .= " "; //concatenate spaces between eventids in string
	$eventids .= (string)addslashes($row['eventid']); //include eventids in string
	$event = array(
		"eventname" => htmlentities($row['eventname']),
		"eventdate" => htmlentities($row['event_date']),
		"eventtime" => htmlentities($row['event_time']),
		"eventdescript" => htmlentities($row['event_descript']),
		"weekly" => htmlentities($row['weekly']),
		"flagged" => htmlentities($row['flagged'])
	);
	$sendArray[addslashes($row['eventid'])] = $event; //index JSON data by eventid
}

$eventids .= " "; //add another space to eventids string
$sendArray['eventids'] = $eventids; //include eventids string in JSON data so we know how to iterate/index

echo json_encode($sendArray);
$stmt->close();

?>