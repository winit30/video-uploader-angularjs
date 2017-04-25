<?php

include("connections.php");

if($_SERVER['REQUEST_METHOD'] == 'POST'){
 
	   $data = json_decode(file_get_contents('php://input'));
       $email = $data->email;
       $pass = md5(sha1($data->password));
 
           $sql = "SELECT id FROM `user_master` WHERE email='".$email."' AND password='".$pass."'";
 
			$result = $conn->query($sql);
 
		if ($result->num_rows > 0) {
			$row = $result->fetch_assoc();
 
			$token;
			if(count($result)==1){
 
				$token = $email.'|'.uniqid().uniqid().uniqid();
 
				$q = "UPDATE `user_master` SET token='".$token."' WHERE email='".$email."' AND password='".$pass."'";
 
				$query = $conn->query($q);
 
				echo json_encode(array("token"=>$token));
			} else {
				echo "ERROR";
			}
 
		} else {
			echo "Wrong Credentials";
		}
 
   }
      $conn->close();
?> 