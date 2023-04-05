
//carga las lista en lo select
function lista(tabla,campo,id){
        
        let where = "false";
        let value = "";
           
        if(campo && id)
        {   console.log(`campo: ${campo} id:${id} ` )   ;
            value = $("#"+campo).val(); 
            where = `where ${id}=${value}`;
            
            
            
        }
    
    	$.ajax({
              url: './php/ajax/lista.php',
              method: 'GET', 
              data:"tabla="+tabla+"&where="+where,
              
              success: function(data) { 
                  
                  $(`#${tabla}`).html(data);
              },
              
            });
    
    
    
    
}

//busca en la base de datos los registros para imprimir los checkbox
function opciones(){
    
    
    $.ajax({
              url: './php/ajax/opciones.php',
              method: 'GET', 
             
              
              success: function(data) { 
                  
                  $('#list_medios').html(data);
              },
              
            });
    
}

//guarda la información del formulario
function guardar_voto(){
    
  // obtener los valores de los campos del formulario
  var nombre = $("#nombre").val();
  var alias = $("#alias").val();
  var rut = $("#rut").val();
  var email = $("#email").val();
  var id_comuna = $("#comunas").val();
  var id_candidato = $("#candidatos").val();
  // Obtener los medios seleccionados
  var mediosSeleccionados = {};
  $('[id^=medio]').each(function() {
      var medioId = $(this).attr('id').replace('medio', '');
      mediosSeleccionados[medioId] = ($(this).is(':checked')) ? 1 : 0;
  });

  // enviar una solicitud AJAX al servidor para guardar los datos en la base de datos
  $.ajax({
    url: "./php/ajax/votar.php",
    method: "POST",
    data: {
      nombre: nombre,
      alias: alias,
      rut: rut,
      email: email,
      id_comuna: id_comuna,
      id_candidato: id_candidato,
      medios: mediosSeleccionados,
    },
    success: function (data) {
      if(data==1)
      {
        $("#mensaje").html("<span style='color:green'>Gracias por tu voto</span>");  
        document.getElementById("form_voto").reset();
          
      }else if(data===0){
          
          $("#mensaje").html("<span style='color:red'>Error al ingresar los datos</span>");  
      
          
      }else if(data==3){
          
          $("#mensaje").html("<span style='color:red'>No pudimos procesar tu solicitud</span>");
          $("#error_rut").html("Rut ya realizó el voto");
          $("#rut").focus();
      
          
      }else{
           $("#mensaje").html("<span style='color:red'>No hay respuesta. Intente mas tarde!</span>");  
          
      }
      
    },
    error: function () {
      // mensaje error
      $("#mensaje").html("<span style='color:red'>Ha ocurrido un error al guardar los datos. Por favor, inténtalo de nuevo más tarde.</span>");
    },
  });
}