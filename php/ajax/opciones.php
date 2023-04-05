<?php

// credenciales y conexion a base de datos
include("../config/db.php");
include("../config/con_mysql.php");

//recibimos el request


//consulta 
$sql = "select * from opciones order by id asc";


$result = mysqli_query($con,$sql);


//número de registros

$num = mysqli_num_rows($result);

$option="";

if($num>0)
{
    while($row=mysqli_fetch_array($result))
    {
        //recorremos los registros
        
        $option .= ' <input type="checkbox" id="medio'.$row["id"].'" name="medio'.$row["id"].'" value="'.$row["id"].'">'.$row["nombre"].' ';
        
    }
}

$option.='<br><span id="error_medio" style="color:red;"></span>';

echo $option;


?>