<?php


	$name= $_POST['name'];


	$sql="select year,paper_doi,author_name,count(*) as num from author_affiliation_b where paper_doi in ( select paper_doi from author_affiliation_b where author_name = '$name') group by year,author_name ";  
	$sql1="select author_name,count(*) as num from author_affiliation_b where paper_doi in (select paper_doi from author_affiliation_b where author_name = '$name') group by author_name  order by count(*) desc";
	$sql2="select distinct year from author_affiliation_b where author_name='$name'";

	$con=mysqli_connect('localhost','root','','papervis') or die('Connect Error');
	mysqli_set_charset($con,'utf8');

	$result=mysqli_query($con,$sql);
	if($result && mysqli_num_rows($result)>0){
		while($row=mysqli_fetch_assoc($result)){
			$rows[]=$row;
		}
	}

	$result1=mysqli_query($con,$sql1);
	if($result1 && mysqli_num_rows($result1)>0){
		while($row1=mysqli_fetch_assoc($result1)){
			$rows1[]=$row1;
		}
	}

	$result2=mysqli_query($con,$sql2);
	if($result2 && mysqli_num_rows($result2)>0){
		while($row2=mysqli_fetch_assoc($result2)){
			$rows2[]=$row2;
		}
	}

	$r[]=$rows;
	$r[]= $rows1;
	$r[]=$rows2;

	$json_string=json_encode($r,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
	echo $json_string;


	mysqli_free_result($result);
	mysqli_free_result($result1);
	mysqli_free_result($result2);
	mysqli_close($con);

?>