<?php
    // credenciales y conexion a base de datos
    include("../config/db.php");
    include("../config/con_mysql.php");
    include("./funciones.php");

 // Obtener los datos del formulario
    $nombre = $_POST['nombre'];
    $alias = $_POST['alias'];
    $rut = $_POST['rut'];
    $email = $_POST['email'];
    $id_comuna = $_POST['id_comuna'];
    $id_candidato = $_POST['id_candidato'];
    
    
    //comprobamos que el rut no se repita
    
    $num_rut = get_num_row("votos", "rut", $rut);
    if($num_rut>0){
        echo 3;
        exit;
    }
    
    // Recuperar los medios seleccionados del formulario
    $medios = array();
    foreach ($_POST['medios'] as $medioId => $valor) {
        if ($valor == 1) {
            $medios[] = $medioId;
        }
    }
    
    // Convertir el array de medios en una cadena separada por comas
    $medios_str = implode(',', $medios);

    // Guardar los datos en la base de datos
    $sql = "INSERT INTO votos (nombre, alias, rut, email, id_comuna, id_candidato, medios) VALUES ('$nombre', '$alias', '$rut', '$email', '$id_comuna', '$id_candidato', '$medios_str')";
    $result= mysqli_query($con, $sql);
    
    //enviamos el resultado de la operación
    if($result)
    {
    echo 1;        
    }else{
        echo 0;
    }


?>