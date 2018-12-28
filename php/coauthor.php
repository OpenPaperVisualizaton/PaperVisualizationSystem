<?php


	$name= $_POST['name'];



	$con=mysqli_connect('localhost','root','','papervis') or die('Connect Error');
	mysqli_set_charset($con,'utf8');

    $sql="create temporary table tmp ( select author_name,count(*) as num from author_affiliation_b where paper_doi in (select paper_doi from author_affiliation_b where author_name = '$name') group by author_name  order by count(*) desc)";
	$answer=mysqli_query($con,$sql);

    $sql1="select * from tmp";

	$result1=mysqli_query($con,$sql1);
	if($result1 && mysqli_num_rows($result1)>0){
		while($row1=mysqli_fetch_assoc($result1)){
			$rows1[]=$row1;
		}
	}

    $sql2="select distinct year from author_affiliation_b where author_name='$name'";
	$result2=mysqli_query($con,$sql2);
	if($result2 && mysqli_num_rows($result2)>0){
		while($row2=mysqli_fetch_assoc($result2)){
			$rows2[]=$row2;
		}
	}

    $sql3 = "select author_name from tmp limit 5";
	$result3=mysqli_query($con,$sql3);
	if($result3 && mysqli_num_rows($result3)>0){
		while($row3=mysqli_fetch_assoc($result3)){
			$rows=array();
			$author=$row3['author_name'];
            $sql="select year,author_name,count(*) as num from author_affiliation_b where  author_name = '$author' group by year,author_name";
            $result=mysqli_query($con,$sql);
            if($result && mysqli_num_rows($result)>0){
                while($row=mysqli_fetch_assoc($result)){
                    $rows[]=$row;
                } 
            }
            $rr[]= $rows;     
		}
	}

	$r[]=$rows1;
	$r[]=$rows2;
    $r[]=$rr;

	$json_string=json_encode($r,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
	echo $json_string;


	mysqli_free_result($result1);
	mysqli_free_result($result2);
	mysqli_close($con);

?>