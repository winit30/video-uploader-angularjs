<?php
 
   include('connections.php');
	$data = json_decode(file_get_contents('php://input'));
	$token = $data->token;
 
	$conn->query("UPDATE user_master SET token='LOGGED OUT' WHERE token='".$token."'");
    
   echo $token.' User Logged out successfully';
   $conn->close();
?>