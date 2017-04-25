<?php
 
  include('connections.php');
 
  $data = json_decode(file_get_contents('php://input'));
  $token = $data->token;
 
  $query = $conn->query("SELECT id FROM user_master WHERE token='".$token."'");
   
  if($query){
	  $row = $query->fetch_assoc();
	  if(count($row)>=1){
		  echo trim($row['id']);
	  }	else {
			echo "";
		}
  } else {
	  echo "";
  }
 
  $conn->close();
?>