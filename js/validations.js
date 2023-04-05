//funciones para validar

//comprueba si un dato esta vacio
function vacio(campo) {
  const camp = $("#" + campo).val();

  if (camp === "") {
    $("#".campo).focus();
    $("#error_" + campo).html("El campo no puede estar vacio");
    return false;
  } else {
    $("#error_" + campo).html("");
    return true;
  }
}

//comprueba si el email es valido
function validarEmail(campo) {
  const email = $("#" + campo).val();
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;

  if (!regex.test(email)) {
    $("#error_" + campo).html("debe ser formato email");
    $("#" + campo).focus();
    return false;
  } else {
    $("#" + campo).focus();
    $("#error_" + campo).html("");
    return true;
  }
}

//comprueba si el campo tiene mas de 5 caracteres y si tiene letras y números
function valCaracter(campo) {
  const alias = $("#" + campo).val();

  if (
    alias.length > 5 &&
    /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/.test(alias)
  ) {
    $("#error_" + campo).html("");
    return true;
  } else {
    $("#" + campo).focus();
    $("#error_" + campo).html(
      campo + " debe tener mas de 5 caracteres y contener letras y números "
    );
    return false;
  }
}

//cumprueba si el rut es valido

function validarRut(campo) {
  const camp = $("#" + campo).val();

  //eliminamos los puntos para realizar las operaciones
  const rut = camp.replace(/\./g, "");
  const regex = /^0*(\d{1,3}(\.?\d{3})*)\-?([\dkK])$/;

  //validamos que el campo no este vacio
  if (vacio(campo)) {
    if (!regex.test(rut)) {
      // El formato del RUT es inválido
      $("#error_" + campo).html("Formato incorrecto");
      return false;
    } else {
      const [_, cuerpo, __, dv] = rut.match(regex);
      let suma = 0;
      let multiplicador = 2;

      // Calcular la suma ponderada del cuerpo del RUT
      for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo.charAt(i)) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
      }

      const resto = suma % 11;
      const dvCalculado = resto === 0 ? 0 : resto === 1 ? "K" : 11 - resto;

      // Comparar el dígito verificador calculado con el dígito verificador del RUT
      if (dv === dvCalculado.toString()) {
        $("#error_" + campo).html("");
        return true;
      } else {
        $("#error_" + campo).html("Rut no valido");
        return false;
      }
    }
  }
}

// valida la cantidad minima de checkbock seleccionados
function validarCheckMin(campo, SeletorMin) {
  var checkboxes = $(`input[id^="${campo}"]:checked`);
  var numCheckboxesSelected = checkboxes.filter(":checked").length;
  if (numCheckboxesSelected >= SeletorMin) {
    $("#error_" + campo).html("");
    return true;
  } else {
    $("#error_" + campo).html("Debe seleccionar 2 opciones");
    return false;
  }
}
