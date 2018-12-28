<?php


	$key = $_POST['key'];
	$affiliation = $_POST['affiliation'];
	$sort=$_POST['sort'];

	if($sort=='papers')
		$s='count(*)';
	else $s='sum(citation)';

	if($affiliation!='all'&&$key=='all'){
		$sql="select author_name,count(*) as num,sum(citation) as citation from author_affiliation_b where uni_affiliation = '$affiliation' group by author_name order by $s desc";
	}
	else if($affiliation!='all'&&$key!='all'){
		$sql=" select author_name,count(*) as num,sum(citation) as citation from author_affiliation_b  where uni_affiliation = '$affiliation' and paper_doi in (select paper_doi from paper_info where paper_title like '%$key%' or author_keywords like '%$key%') group by author_name order by $s desc ";
	}
    else if($key=='all'){
        $sql="select author_name,count(*) as num,sum(citation) as citation from author_affiliation_b group by author_name order by $s desc";
    }
	else{
		$sql=" select author_name,count(*) as num,sum(citation) as citation from author_affiliation_b  where paper_doi in (select paper_doi from paper_info where paper_title like '%$key%' or author_keywords like '%$key%') group by author_name order by $s desc ";
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