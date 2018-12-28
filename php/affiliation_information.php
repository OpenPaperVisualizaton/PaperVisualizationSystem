<?php


	$name = $_POST['name'];


	$con=mysqli_connect('localhost','root','','papervis') or die('Connect Error');
	mysqli_set_charset($con,'utf8');

	$sql="select adress from affiliation_information where uni_affiliation='$name'";

	$result=mysqli_query($con,$sql);
	if($result && mysqli_num_rows($result)>0){
		while($row=mysqli_fetch_assoc($result)){
			$rows[]=$row;
		}
	}
	$json_string=json_encode($rows,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
	echo $json_string;
	mysqli_free_result($result);
	mysqli_close($con);

?>