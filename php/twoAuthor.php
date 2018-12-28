<?php


	$fName = $_POST['fName'];
    $sName = $_POST['sName'];
	$year=$_POST['year'];

	if($year != 0){
		$y = " and year=$year";
	}
	else{
		$y=" ";
	}


	if($fName==$sName){
		$sql="select year,paper_title,link,author_name,citation from paper_info where  author_name like '%$fName%' $y ";
	}
	else {
		$sql="select year,paper_title,link,author_name,citation from paper_info where author_name like '%$sName%' and author_name like '%$fName%' $y ";
    } 
        

	$con=mysqli_connect('localhost','root','','papervis') or die('Connect Error');
	mysqli_set_charset($con,'utf8');

	$result=mysqli_query($con,$sql);
	if($result && mysqli_num_rows($result)>0){
		while($row=mysqli_fetch_assoc($result)){
			$rows[]=$row;
		}
	}
	if(mysqli_num_rows($result)==0)
		echo 'null';
	else{
		$json_string=json_encode($rows,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
		echo $json_string;
	}

	mysqli_free_result($result);
	mysqli_close($con);

?>