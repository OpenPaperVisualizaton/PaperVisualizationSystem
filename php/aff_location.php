<?php

	$key=$_POST['key'];
	
	if($key!="all"){
		$sql="select uni_affiliation as affiliation,count(*) as num,lat,lng  
		from (select paper_doi,uni_affiliation,lat,lng 
				from author_affiliation_b 
				where paper_doi in (select paper_doi from paper_info 
									where paper_title like '%$key%' or author_keywords like '%$key%') 
				group by paper_doi,uni_affiliation) as a  
		where  uni_affiliation is not null 
		group by uni_affiliation 
		order by count(*) desc";
	}
	else{
    	$sql="select uni_affiliation as affiliation,count(*) as num,lat,lng  from (select paper_doi,uni_affiliation,lat,lng from author_affiliation_b group by paper_doi,uni_affiliation) as a  where  uni_affiliation is not null group by uni_affiliation order by count(*) desc";
	}

	$con=mysqli_connect('localhost','root','','papervis') or die('Connect Error');
	mysqli_set_charset($con,'utf8');

	$result=mysqli_query($con,$sql);
	if($result && mysqli_num_rows($result)>0){
		while($row=mysqli_fetch_assoc($result)){
			$rows[]= $row;
		}
	}
    

	if(mysqli_num_rows($result)==0)
		echo 'null';
	else{
		$jsons=json_encode($rows,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
        echo $jsons;
	}

    

	mysqli_free_result($result);
	mysqli_close($con);

?>
