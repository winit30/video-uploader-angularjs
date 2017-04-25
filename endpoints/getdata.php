<?php
 
  include('connections.php');
 
  $data = json_decode(file_get_contents('php://input'));
  $uid = $data->user_id; 
 
  $query = $conn->query("SELECT name, email, phone FROM user_master WHERE id='".$uid."'");
   
  if($query){
	  $row = $query->fetch_assoc();
	  
	  if(count($row)>=1){
		  echo json_encode($row);
	  }	else {
			echo "";
		}
  } else {
	  echo "";
  }
 
  $conn->close();
?>