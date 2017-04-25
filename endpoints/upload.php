<?php
	include("connections.php");
	$data = json_decode(file_get_contents('php://input'));
	$chunkData = $data->chunk;
	$chunkLength = $data->chunkLength;
	$chunkNum = $data->chunkNum;
	$filename = $data->filename;
	$userID = $data->user;
	
	if(strlen($chunkData) != 0){
		
		$target_dir = "../uploads/".trim($userID)."/";
		if(!is_dir($target_dir)) {
			@mkdir($target_dir);
		}
		
		echo $chunkData;
		$myfile = fopen($target_dir.$filename.".txt", "a+") or die("Unable to open file!");
		$txt = $chunkData;
		fwrite($myfile, $txt);
		fclose($myfile);
		
		$sql = "SELECT id FROM `user_video` WHERE filename='".$filename."' AND chunklength='".$chunkLength."' AND user_id='".$userID."'";
		
		$result = $conn->query($sql);
		
		if ($result->num_rows > 0) {
			
			$q2 = "UPDATE `user_video` SET status='".$chunkNum."' WHERE filename='".$filename."' AND chunklength='".$chunkLength."' AND user_id='".$userID."'";
			
			mysqli_query($conn, $q2);
			
		} else {
			$q = "INSERT INTO user_video (user_id, filename, status, chunklength) VALUES ('".$userID."', '".$filename."', '".$chunkNum."', '".$chunkLength."')";
			mysqli_query($conn, $q);
		}
		
	} else {
		
	}
	$conn->close();
?>