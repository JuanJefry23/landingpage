const btnFormulario = document.querySelector("#btn-formulario");

//---------------------------Eventos----------------------------
btnFormulario.addEventListener("click", (e) => {
  e.preventDefault();
  const formulario = document.querySelector("#hide-formulario");
  const parrafoFormulario = document.querySelector("#parrafo-mostrar");
  const tituloFormulario = document.querySelector("#titulo-mostrar");

  const inputNombre = document.querySelector("#nombre_formulario").value;
  const inputMail = document.querySelector("#mail_formulario").value;
  const inputMotivo = document.querySelector("#motivo_formulario").value;
  const inputMensaje = document.querySelector("#mensaje_formulario").value;
  const infoFormulario = {
    nombre: inputNombre,
    mail: inputMail,
    motivo: inputMotivo,
    mensaje: inputMensaje,
  };
  if (validarFormulario()) {
    postABaseDatos(infoFormulario);
    envioACorreo(infoFormulario);
    formulario.classList.add("hide");
    parrafoFormulario.classList.remove("hide");
    tituloFormulario.classList.remove("hide");
    setTimeout(() => {
      formulario.classList.remove("hide");
      parrafoFormulario.classList.add("hide");
      tituloFormulario.classList.add("hide");
      const form = document.querySelector("#hide-formulario");
      form.reset();
    }, 5000);
  }
});

//-------------------------------Funciones------------------------------------------

//Función que envia informacion mediante fetch a php para que sea almacenado en B.Datos
const postABaseDatos = async () => {
  const url = "../php/guardar.php";

  try {
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(infoFormulario),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

//Función que envia mediante fetch informacion a php para que sea enviado a un correo electronico
const envioACorreo = async () => {
  const url = "../php/enviarCorreo.php";
  try {
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(infoFormulario),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // window.location.href = "index.html";
  } catch (error) {
    console.log("Error: ", error);
  }
};

//Función que valida el formulario para distintos casos
const validarFormulario = () => {
  const inputNombre = document.querySelector("#nombre_formulario").value;
  const inputMail = document.querySelector("#mail_formulario").value;
  const inputMotivo = document.querySelector("#motivo_formulario").value;
  const inputMensaje = document.querySelector("#mensaje_formulario").value;
  console.log(inputNombre);
  console.log(inputMail);
  if (
    inputNombre != "" &&
    inputMotivo != "" &&
    inputMensaje != "" &&
    !validarCorreo(inputMail)
  ) {
    mostrarAlerta("Correo inválido, ingrese uno correcto");
  } else if (
    inputNombre != "" &&
    inputMotivo != "" &&
    inputMensaje != "" &&
    validarCorreo(inputMail)
  ) {
    return true;
  } else {
    mostrarAlerta("Todos los campos son obligatorios");
  }
};

//Función que muestra una alerta según sea el caso
const mostrarAlerta = (mensaje) => {
  const existeAlerta = document.querySelector(".alerta");
  const mensajeAlerta = document.createElement("p");
  const divFormulario = document.querySelector("#info-formulario");
  mensajeAlerta.textContent = mensaje;
  mensajeAlerta.classList.add("alerta");

  if (!existeAlerta) {
    divFormulario.appendChild(mensajeAlerta);
  }

  setTimeout(() => {
    divFormulario.removeChild(mensajeAlerta);
  }, 3000);
};

//Función que valida el Correo mediante expresiones regulares
const validarCorreo = (email) => {
  const expReg =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  const esValido = expReg.test(email);

  if (esValido) {
    return true;
  } else {
    return false;
  }
};
