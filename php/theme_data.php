<?php

    $name=$_POST['name'];


	$con=mysqli_connect('localhost','root','','papervis') or die('Connect Error');
	mysqli_set_charset($con,'utf8');

	// if($name=='all'){
	// 	$sql="create temporary table tmp ( select   category,count(*) as num from paper_keywords where  category is not null group by category order by count(*) desc limit 6)";
	// }else{
    // 	$sql="create temporary table tmp ( select   category,count(*) as num from paper_keywords where paper_doi in (select paper_doi from author_affiliation_b where author_name='$name' or uni_affiliation='$name') and category is not null group by category order by count(*) desc limit 6)";
	// }
	// $answer=mysqli_query($con,$sql);

    // $sql1="select * from tmp";

	$sql="create temporary table tmp (select author_keywords,count(*) as num from paper_keywords  where paper_doi in (select paper_doi from author_affiliation_b where author_name='$name' or uni_affiliation='$name') group by author_keywords order by count(*) desc limit 6)";
	$answer=mysqli_query($con,$sql);
	$sql1="select author_keywords as category,num from tmp";

	$result=mysqli_query($con,$sql1);
	if($result && mysqli_num_rows($result)>0){
		while($row=mysqli_fetch_assoc($result)){
			$rows[]=$row;
		}
	}

	// if($name=='all'){
	// 	$sql2="select year,  category,count(*) as num 
	// 			from  paper_keywords 
	// 			where category in (select a.category from tmp as a)  
	// 			group by year,category";

	// }else{
	// 	$sql2="select year,  category,count(*) as num 
	// 			from  paper_keywords 
	// 			where category in (select a.category from tmp as a)  
	// 				and paper_doi in (select paper_doi 
	// 									from author_affiliation_b 
	// 									where author_name='$name' or uni_affiliation='$name')
	// 			group by year,category";
	// }

	$sql2="select year, author_keywords as   category,count(*) as num 
	 			from  paper_keywords 
	 			where author_keywords in (select a.author_keywords from tmp as a)  
	 				and paper_doi in (select paper_doi 
	 									from author_affiliation_b 
	 									where author_name='$name' or uni_affiliation='$name')
	 			group by year,author_keywords";

	$result2=mysqli_query($con,$sql2);
	if($result2 && mysqli_num_rows($result2)>0){
		while($row2=mysqli_fetch_assoc($result2)){
			$rows2[]=$row2;
		}
	}

    $r[]=$rows;
    $r[]=$rows2;

    $json_string=json_encode($r,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
    echo $json_string;

	mysqli_free_result($result);
    mysqli_free_result($result2);
	mysqli_close($con);

?>