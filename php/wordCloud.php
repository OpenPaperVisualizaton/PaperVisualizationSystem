<?php

    $name=$_POST['name'];



	$con=mysqli_connect('localhost','root','','papervis') or die('Connect Error');
	mysqli_set_charset($con,'utf8');


	if($name=='all'){
		$sql="select author_keywords,count(*) as num from paper_keywords  group by author_keywords order by count(*) desc limit 15 ";
	}else{
    	$sql="select author_keywords,count(*) as num from paper_keywords where paper_doi in ( select paper_doi from author_affiliation_b where author_name= '$name' or uni_affiliation='$name') group by author_keywords order by count(*) desc limit 15 ";
	}
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