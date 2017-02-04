<?php
// register_ajax.php
require 'module5_database.php';

header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
 
$username = $_POST['username'];
$password = $_POST['password'];


if( !preg_match('/^[\w_\s\-]+$/', $username) ){ //check validity of username
	echo json_encode(array(
		"success" => false,
		"message" => "Invalid new username"
	));
	exit;
}
    
if( !preg_match('/^[\w_\s\-]+$/', $password) ){ //check validity of password
	echo json_encode(array(
		"success" => false,
		"message" => "Invalid new password"
	));
	exit;
}

$stmt = $mysqli->prepare("select username from users order by userid");
if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
}
 
$stmt->execute();
 
$stmt->bind_result($founduser);
 
while($stmt->fetch()){
	if($founduser == $username) { //if the new username is taken, tell the user that
		echo json_encode(array(
			"success" => false,
			"message" => "Username is already taken"
		));
		exit;
	}
}
 
$stmt->close();
 
$username = $username; //pull new user's username to insert into database
$password = crypt($password); //encrypt this new user's password
 
$stmt2 = $mysqli->prepare("insert into users (username, password) values (?, ?)"); //enter new user and encrypted password into database
if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
}
 
$stmt2->bind_param('ss', $username, $password);
 
$stmt2->execute();
 
$stmt2->close();
 
//// Use a prepared statement
//$stmt3 = $mysqli->prepare("SELECT COUNT(*), userid, password FROM users WHERE username=?");
//
//$stmt3->bind_param('s', $username);
//$stmt3->execute();
//
//// Bind the results
//$stmt3->bind_result($cnt, $user_id, $pwd_hash);
//$stmt3->fetch();
 
 
//// Compare the submitted password to the actual password hash
//if( $cnt == 1 && crypt($password, $pwd_hash)==$pwd_hash){
	//session_start();
	//$_SESSION['username'] = $username;
	//$_SESSION['userid'] = $user_id;
	//$_SESSION['token'] = substr(md5(rand()), 0, 10);
 
	echo json_encode(array(
		"success" => true
	));
	exit;
//}else{
//	echo json_encode(array(
//		"success" => false,
//		"message" => "Incorrect Username or Password"
//	));
//	exit;
//}
?>