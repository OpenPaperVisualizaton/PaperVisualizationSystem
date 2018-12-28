<?php


	$key = $_POST['key'];
    $author = $_POST['author'];
	$affiliation=$_POST['affiliation'];

	if($affiliation!='all'&&$key=='all'){
		$sql="select year,paper_title,link,author_name,citation from paper_info where paper_doi in (select paper_doi from author_affiliation_b where uni_affiliation= '$affiliation')   ";
	}
	else if($affiliation!='all'&&$key!='all'){
		$sql="select year,paper_title,link,author_name,citation from paper_info where paper_doi in (select paper_doi from author_affiliation_b where uni_affiliation= '$affiliation') and (paper_title like '%$key%' or author_keywords like '%$key%')";
	}
	else if($key=='all'&&$author=='all'){
        $sql="select year,paper_title,link,author_name,citation from paper_info";
    }
	else if($key=='all'&&$author!='all'){
		$sql="select year,paper_title,link,author_name,citation from paper_info where paper_doi in (select paper_doi from author_affiliation where author_name like '%$author%')";
	}
    else if($key!='all'&&$author=='all'){
		$sql="select year,paper_title,link,author_name,citation from paper_info where paper_title like '%$key%' or author_keywords like '%$key%'";
	}
    else{
		$sql="select year,paper_title,link,author_name,citation from paper_info where paper_doi in( select paper_doi from paper_keywords where author_keywords='$key' and paper_doi in (select paper_doi from author_affiliation_b where author_name='$author'))";
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