const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');


const expresiones = {
	
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
	provincia: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
	correo: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
	telefono: /^\d{0,14}$/ // 7 a 14 numeros.
}

const campos = {
	nombre: false,
	apellido: false,
	provincia: false,
	email: false,
	telefono: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target,'nombre');
		break;
		case "apellido":
			validarCampo(expresiones.apellido, e.target, 'apellido');
		break;
		case "provincia":
			validarCampo(expresiones.apellido, e.target, 'provincia');
		break;
		case "email":
			validarCampo(expresiones.correo, e.target, 'email');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
	}

}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`dato_${campo}`).classList.remove('datospers-incorrecto');
		document.getElementById(`dato_${campo}`).classList.add('datospers-correcto');
		campos[campo] = true;
	} else {
		document.getElementById(`dato_${campo}`).classList.add('datospers-incorrecto');
		document.getElementById(`dato_${campo}`).classList.remove('datospers-correcto');
		campos[campo] = false;
	}
}


inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

function validarRadius() {
	
	const radios = document.querySelectorAll('.socio');

	let respuestaSeleccionada = false;

	radios.forEach((radio) => {
			
            if (radio.checked && radio.value === 'si') {
                respuestaSeleccionada = true;
            }
        });

		return respuestaSeleccionada;
}
formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	let socio = validarRadius();

	if(campos.nombre && campos.apellido && campos.provincia && campos.email && campos.telefono && socio){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});