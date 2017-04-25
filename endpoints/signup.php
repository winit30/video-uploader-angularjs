<?php 
    include("connections.php");
    $data = json_decode(file_get_contents("php://input"));
    $name = $data->name;
	$email = $data->email;
	$phone = $data->phone;
    $password = $data->password;
	
    $q = "INSERT INTO user_master (name, email, phone, password) VALUES ('".$name."', '".$email."', '".$phone."', '".md5(sha1($password))."')";
	
    mysqli_query($conn, $q);
	
	$token = $email.'|'.uniqid().uniqid().uniqid();
	
	$q2 = "UPDATE `user_master` SET token='".$token."' WHERE email='".$email."' AND password='".md5(sha1($password))."'";
	
			mysqli_query($conn, $q2);
 
			echo json_encode(array("token"=>$token));
?>