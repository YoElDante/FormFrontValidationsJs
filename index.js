//Comprobando coneccion con html
document.getElementById('pageTitle').style.color = 'purple';

/*
<input type="text" id="firstname" name="nombre" required>
<input type="text" id="surname" name="apellido" required>
<input type="email" id="email" name="email" required>
<input type="password" id="password" name="contraseña" required>
<input type="password" id="passwordConfirm" name="confirmarContraseña" required>
<button type="submit" id="submid">Registrarse</button>

lugar para el error
<p class="errMsg"></p>
*/

const elForm = document.getElementById('registroForm')
const elInputFirstname = document.getElementById('firstname');
const elInputSurname = document.getElementById('surname');
const elInputBirthdate = document.getElementById('birthdate');
const elInputEmail = document.getElementById('email');
const elInputpassword = document.getElementById('password');
const elInputpasswordConfirm = document.getElementById('passwordConfirm');
const elInputSubmid = document.getElementById('submid');

function validation(element, regex, errorMsg = 'Campo obligatorio') {
  //sanitizacion de campo
  element.value = element.value.trim();
  element.value = element.value.charAt(0).toUpperCase() + element.value.slice(1).toLowerCase();

  if (regex.test(element.value)) {
    //Si el campo SI pasa el test
    // Si hay un mensaje de error anterior, lo queremos borrar
    element.nextElementSibling.innerText = '';

    //guardamos en una variable que esto esta correcto para el submit final
    element.isOk = true;

  } else {
    //Si el campo NO pasa el test
    // Mensaje de error que queremos mostrar si el usuario completa incorrectamente el campo
    element.nextElementSibling.innerText = errorMsg;

    //guardamos en una variable que esto esta correcto para el submit final
    element.isOk = false;
  }
}


//---------------   
//   Firstname   
//---------------   

elInputFirstname.addEventListener('blur', function () {
  validation(this, /^[A-Z][a-z]{2,}$/)
  //Queremos manejar las validaciones del input mediante expresiones regulares
  //Que al menos tenga 3 caracteres
  //Que la primer letra este en mayuscula
  //Que no contenga espacios
  //Que no contenga simbolos ni numeros
})

//-------------
//   Surname   
//-------------
elInputSurname.addEventListener('blur', function () {
  validation(this, /^[A-Z][a-z]{2,}$/)
})

//------------
//   Email
//------------
elInputEmail.addEventListener('blur', function () {
  validation(this, /^[^\s@]{3,}@[^@\s]{3,}\.com$/
    , ('mail obligatorio\n' + 'debe contener un @\n' + 'debe tener .com\n' +
      'Debe tener al menos 3 letras antes y despues del @'))
})

//---------------
//   Birthdate 
//---------------

elInputBirthdate.addEventListener('focus', function () {
  this.nextElementSibling.innerText = 'La fecha debe ser posterior 01/01/1920\n' + 'Debes ser mayor de 18 años para continuar';
  this.nextElementSibling.style.color = "blue"
});

elInputBirthdate.addEventListener('blur', function () {

  let birthdate = new Date('0001-01-01')
  if (this.value){
    birthdate = new Date(this.value);
  }

  // Declaramos la fecha mínima
  const minDate = new Date('1920-01-01');

  // Calculamos la fecha hace 18 años
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

  // Validar si la fecha está dentro del rango
  if (birthdate > eighteenYearsAgo || birthdate < minDate) {
    // Mostrar mensaje de error
    this.nextElementSibling.innerText = 'La fecha debe ser posterior 01/01/1920\n' + 'Debes ser mayor de 18 años para continuar';
    // Puedes agregar estilos CSS para que el mensaje sea visible
    this.nextElementSibling.style.color = "red"

  } else {
    // Limpiar el mensaje de error si la fecha es válida
    this.nextElementSibling.innerText = '';
    elInputBirthdate.isOk = true;
  }
});

//--------------   
//   Password   
//--------------   
const textPasswordRequires = 'La contraseña debe tener al menos 8 caracteres\n' +
  'Debe poseer al menos una letra Mayúscula\n' +
  'Debe poseer al menos una letra Minúscula\n' +
  'Debe poseer al menos un caracter especial\n' +
  'Lista de caracteres especiales: !@#$%^&*()-_=+{};:,<.>'

elInputpassword.addEventListener('focus', function () {
  this.nextElementSibling.innerText = textPasswordRequires
  this.nextElementSibling.style.color = 'blue'
})

elInputpassword.addEventListener('blur', function () {
  const regex = /^(?=.*[!@#$%^&*()-_=+{};:,<.>])(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  if (regex.test(this.value)) {
    //Si el campo SI pasa el test
    // Si hay un mensaje de error anterior, lo queremos borrar
    this.nextElementSibling.innerText = '';

    //guardamos en una variable que esto esta correcto para el submit final
    this.isOk = true;

  } else {
    //Si el campo NO pasa el test
    // Mensaje de error que queremos mostrar si el usuario completa incorrectamente el campo
    this.nextElementSibling.innerText = textPasswordRequires;
    this.nextElementSibling.style.color = 'red'

    //guardamos en una variable que esto esta correcto para el submit final
    this.isOk = false;
  }

})

elInputpasswordConfirm.addEventListener('blur', function () {
  if (this.value === elInputpassword.value) {
    //Si el campo SI pasa el test
    // Si hay un mensaje de error anterior, lo queremos borrar
    this.nextElementSibling.innerText = 'Las contraseñas coinciden correctamente';
    this.nextElementSibling.style.color = 'green'
    //guardamos en una variable que esto esta correcto para el submit final
    this.isOk = true;

  } else {
    //Si el campo NO pasa el test
    // Mensaje de error que queremos mostrar si el usuario completa incorrectamente el campo
    this.nextElementSibling.innerText = 'Las contraseñas deben ser iguales';
    this.nextElementSibling.style.color = 'red'
    //guardamos en una variable que esto esta correcto para el submit final
    this.isOk = false;
  }
})

//------------
//   Submit
//------------

elInputSubmid.addEventListener('click', function (event) {

  let errorMsg = '';

  elForm.querySelectorAll('input').forEach(function (campo) {
    if (!campo.isOk) {
      errorMsg += `Error en el campo ${campo.name}\n`
    }
  })

  if (errorMsg === '') {
    this.nextElementSibling.innerText = 'Estan todos bien';
    this.nextElementSibling.style.color = 'green'
  } else {
    this.nextElementSibling.innerText = errorMsg;
    this.nextElementSibling.style.color = 'red'
    event.preventDefault();
  }

})