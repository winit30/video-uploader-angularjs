<?php 

     $data = json_decode(file_get_contents('php://input'));
	 $uid = $data->user_id; 
	include("connections.php");
	 $sql = "SELECT filename FROM `user_image` WHERE user_id='".$uid."'";

	$result = $conn->query($sql);

	for($set = array ();$row = $result->fetch_assoc(); $set[] = $row);
	
	
	echo json_encode($set);
	
?>