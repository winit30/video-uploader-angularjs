<?php
	include("connections.php");
	$data = json_decode(file_get_contents('php://input'));
	$chunkLength = $data->chunkLength;
	$filename = $data->filename;
	$userID = $data->user;
	
	$sql = "SELECT status FROM `user_video` WHERE filename='".$filename."' AND chunklength='".$chunkLength."' AND user_id='".$userID."'";
	
	$result = $conn->query($sql);
	  if($result){
	  $row = $result->fetch_assoc();
	  if(count($row)>=1){
		  echo trim($row['status']);
	  }	else {
			echo "0";
		}
  } else {
	  echo "";
  }
 
  $conn->close();
?>