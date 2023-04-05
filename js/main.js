$(document).ready(function () {
  // mascara para campo rut
  $("#rut").mask("00.000.000-0", { reverse: true });
  //select regiones
  lista("regiones", "", "");
  //select candidatos
  lista("candidatos", "", "");
  //imprime las opciones de los check registrados en la base de datos
  opciones();
});

function votar() {
  const valNombre = vacio("nombre");
  const valRegiones = vacio("regiones");
  const valComunas = vacio("comunas");
  const valCandidatos = vacio("candidatos");
  const valEmail = validarEmail("email");
  const valAlias = valCaracter("alias");
  const valRut = validarRut("rut");
  const validarCheck = validarCheckMin("medio", 2);

  if (
    valNombre &&
    valEmail &&
    valAlias &&
    valRut &&
    validarCheck &&
    valCandidatos &&
    valComunas &&
    valRegiones
  ) {
    guardar_voto();
  } else {
    $("#mensaje").html(
      "<span style='color:red'>Error!!! revise los campos</span>"
    );
  }
}
