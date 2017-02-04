<?php
// login_ajax.php
require 'module5_database.php';

header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
 
$username = $_POST['username'];
$password = $_POST['password'];
 
if( !preg_match('/^[\w_\s\-]+$/', $username) ){ //check validity of entered username
  	echo json_encode(array(
		"success" => false,
		"message" => "Invalid username."
	));
	exit;
}
    
if( !preg_match('/^[\w_\s\-]+$/', $password) ){ //check validity of entered password
	echo json_encode(array(
		"success" => false,
		"message" => "Invalid password."
	));
	exit;
}

// Use a prepared statement
$stmt3 = $mysqli->prepare("SELECT COUNT(*), userid, password FROM users WHERE username=?");

$stmt3->bind_param('s', $username);
$stmt3->execute();

// Bind the results
$stmt3->bind_result($cnt, $user_id, $pwd_hash);
$stmt3->fetch();
 
 
// Compare the submitted password to the actual password hash
if( $cnt == 1 && crypt($password, $pwd_hash)==$pwd_hash){
	
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
	
	$_SESSION['username'] = $username;
	$_SESSION['userid'] = $user_id;
	$_SESSION['token'] = substr(md5(rand()), 0, 10);
 
	echo json_encode(array(
		"success" => true,
		"token" => $_SESSION['token']
	));
	exit;
}else{
	echo json_encode(array(
		"success" => false,
		"message" => "Incorrect Username or Password"
	));
	exit;
}
$stmt3->close();
?>