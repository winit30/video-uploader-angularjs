<?php
	$myfile = fopen("videoCode.txt", "r") or die("Unable to open file!");
	echo fread($myfile,filesize("videoCode.txt"));
	fclose($myfile);
?>