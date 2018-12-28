<?php



    $sql="select author_name,paper_count as num , community_wt as community from author_network order by paper_count desc"  ;
    $sql2="select * from  link_count"  ;
	$sql3="select community_wt as community,sum(paper_count) as num from author_network   group by community_wt order by sum(paper_count) desc";

	$con=mysqli_connect('localhost','root','','papervis') or die('Connect Error');
	mysqli_set_charset($con,'utf8');

	$result=mysqli_query($con,$sql);
	if($result && mysqli_num_rows($result)>0){
		while($row=mysqli_fetch_assoc($result)){
			$rows[]=$row;
		}
	}

	$result2=mysqli_query($con,$sql2);
	if($result2 && mysqli_num_rows($result2)>0){
		while($row2=mysqli_fetch_assoc($result2)){
			$rows2[]=$row2;
		}
	}

	$result3=mysqli_query($con,$sql3);
	if($result3 && mysqli_num_rows($result3)>0){
		while($row3=mysqli_fetch_assoc($result3)){
			$rows3[]=$row3;
		}
	}

    $r[]=$rows;
    $r[]=$rows2;
	$r[]=$rows3;

    $json_string=json_encode($r,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
    echo $json_string;


	mysqli_free_result($result);
	mysqli_free_result($result2);
	mysqli_free_result($result3);
	mysqli_close($con);

?>