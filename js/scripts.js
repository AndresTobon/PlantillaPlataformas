/* Description: Custom JS file */

/* Navigation*/
// Collapse the navbar by adding the top-nav-collapse class
window.onscroll = function () {
  scrollFunction();
  scrollFunctionBTT(); // back to top button
};

window.onload = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.documentElement.scrollTop > 30) {
    document.getElementById("navbarExample").classList.add("top-nav-collapse");
  } else if (document.documentElement.scrollTop < 30) {
    document
      .getElementById("navbarExample")
      .classList.remove("top-nav-collapse");
  }
}

// Navbar on mobile
let elements = document.querySelectorAll(".nav-link:not(.dropdown-toggle)");

for (let i = 0; i < elements.length; i++) {
  elements[i].addEventListener("click", () => {
    document.querySelector(".offcanvas-collapse").classList.toggle("open");
  });
}

document.querySelector(".navbar-toggler").addEventListener("click", () => {
  document.querySelector(".offcanvas-collapse").classList.toggle("open");
});

// Hover on desktop
function toggleDropdown(e) {
  const _d = e.target.closest(".dropdown");
  let _m = document.querySelector(".dropdown-menu", _d);

  setTimeout(
    function () {
      const shouldOpen = _d.matches(":hover");
      _m.classList.toggle("show", shouldOpen);
      _d.classList.toggle("show", shouldOpen);

      _d.setAttribute("aria-expanded", shouldOpen);
    },
    e.type === "mouseleave" ? 300 : 0
  );
}

// On hover
const dropdownCheck = document.querySelector(".dropdown");

if (dropdownCheck !== null) {
  document
    .querySelector(".dropdown")
    .addEventListener("mouseleave", toggleDropdown);
  document
    .querySelector(".dropdown")
    .addEventListener("mouseover", toggleDropdown);

  // On click
  document.querySelector(".dropdown").addEventListener("click", (e) => {
    const _d = e.target.closest(".dropdown");
    let _m = document.querySelector(".dropdown-menu", _d);
    if (_d.classList.contains("show")) {
      _m.classList.remove("show");
      _d.classList.remove("show");
    } else {
      _m.classList.add("show");
      _d.classList.add("show");
    }
  });
}

/* Rotating Text - Word Cycle */
var checkReplace = document.querySelector(".replace-me");
if (checkReplace !== null) {
  var replace = new ReplaceMe(document.querySelector(".replace-me"), {
    animation: "animated fadeIn", // Animation class or classes
    speed: 2000, // Delay between each phrase in miliseconds
    separator: ",", // Phrases separator
    hoverStop: false, // Stop rotator on phrase hover
    clickChange: false, // Change phrase on click
    loopCount: "infinite", // Loop Count - 'infinite' or number
    autoRun: true, // Run rotator automatically
    onInit: false, // Function
    onChange: false, // Function
    onComplete: false, // Function
  });
}

/* Card Slider - Swiper */
var cardSlider = new Swiper(".card-slider", {
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: 3,
  spaceBetween: 70,
  breakpoints: {
    // when window is <= 767px
    767: {
      slidesPerView: 1,
    },
    // when window is <= 991px
    991: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
  },
});

/* Back To Top Button */
// Get the button
myButton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
function scrollFunctionBTT() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    myButton.style.display = "block";
  } else {
    myButton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // for Safari
  document.documentElement.scrollTop = 0; // for Chrome, Firefox, IE and Opera
}
let frm_login, frm_registro, home;
let btn_ir_a_registro, btn_enviar_registrar, btn_enviar;
let correo;
let img_perfil =
  "https://icons.iconarchive.com/icons/jonathan-rey/star-wars-vehicles/48/Death-Star-2nd-icon.png";

window.onload = function () {
  frm_login = document.getElementById("frm_login");
  btn_enviar = document.getElementById("btn_enviar");
  btn_enviar_registrar = document.getElementById("btn_enviar_registrar");
  frm_registro = document.getElementById("frm_registro");
  home = document.getElementById("home");
  btn_ir_a_registro = document.getElementById("btn_ir_a_registro");
  btn_ir_a_registro.addEventListener("click", irARegistro);
  //btn_enviar.addEventListener("click",validar);
  //btn_enviar_registrar.addEventListener("click",registrar);
  configurar_login();
  configurar_registro();
};
function procesardatos() {
  fetch("scripts/scripts.php", {
    method: "post",
    body: new FormData(frm),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      console.log(json);
    })
    .catch(function (err) {
      // Error :(
    });
}
function configurar_login() {
  frm_login.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (frm_login.checkValidity()) {
        compararClave();
      }
      frm_login.classList.add("was-validated");
    },
    false
  );
}

function configurar_registro() {
  frm_registro.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (frm_registro.checkValidity()) {
        registrar();
      }
      frm_registro.classList.add("was-validated");
    },
    false
  );
}

function irARegistro(event) {
  frm_login.reset();
  cambiarFormulario();
}

function cambiarFormulario() {
  frm_login.classList.toggle("ocultar");
  frm_registro.classList.toggle("ocultar");
}

function compararClave() {
  let correo = document.getElementById("correo");
  let clave = document.getElementById("clave");
  event.preventDefault();
  let usuario = JSON.parse(localStorage.getItem("usuario"));
  let html;
  if (correo.value == usuario.correo && clave.value == usuario.clave) {
    frm_login.classList.remove("was-validated");
    frm_login.reset();
    frm_login.classList.add("ocultar");
    home.classList.remove("ocultar");
    html = `
      <nav>
        <img src="${img_perfil}" />
        <a href="javascript:void(0);" id="btn_cerrar_sesion" onclick="cerrarSesion();">Cerrar sesion</a>
      </nav>
      <h2>Pagina principal </h2> 
      <br>Hola ${usuario.nombre}
     `;
    home.innerHTML = html;
  } else {
    alert("Datos incorrectos");
  }
}

function cerrarSesion(event) {
  frm_login.classList.remove("ocultar");
  home.classList.add("ocultar");
}

function registrar() {
  let nombre = document.getElementById("nombre");
  let apellido = document.getElementById("apellido");
  let celular = document.getElementById("celular");
  let direccion = document.getElementById("direccion");
  let correo = document.getElementById("correo1");
  let clave = document.getElementById("clave1");
  let usuario = {
    nombre: nombre.value,
    apellido: apellido.value,
    celular: celular.value,
    direccion: direccion.value,
    correo: correo.value,
    clave: clave.value,
  };

  localStorage.setItem("usuario", JSON.stringify(usuario));
  alert("¡Muy bien, registro exitoso!");
  cambiarFormulario();
}
