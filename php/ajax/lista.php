<?php

// credenciales y conexion a base de datos
include("../config/db.php");
include("../config/con_mysql.php");

//recibimos el request

if(isset($_GET["tabla"])){$tabla = $_GET["tabla"];}
if(isset($_GET["where"])){$where = $_GET["where"];}

//consulta 
if($where == "false")
{

$sql = "select * from $tabla order by nombre asc";

}else{
    
$sql = "select * from $tabla $where order by nombre asc";    
}


$result = mysqli_query($con,$sql);


//número de registros

$num = mysqli_num_rows($result);

$option = "<option value=''>[Seleccionar]</option>";

if($num>0)
{
    while($row=mysqli_fetch_array($result))
    {
        //recorremos los registros
        
        $option .= "<option value=".$row["id"].">".utf8_encode($row["nombre"])."</option>";
        
    }
}

echo $option;


?>