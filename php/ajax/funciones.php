<?php

//funcion para obtener el numero de registros 
function get_num_row($table, $id, $equal){
	global $con;
	$query=mysqli_query($con,"select * from $table where $id='$equal'");
	$rw=mysqli_num_rows($query);
	$value=$rw;

	return $value;
	
	
}

?>