const swal = require('sweetalert2')

const niveles = 10
let teclas = generarTeclas(niveles)

function siguienteNivel(nivelActual) {
	if(nivelActual == niveles) {
		return swal({
			title: 'Ganaste!',
			type: 'success'
		})
	}

	swal({
		timer: 1000,
		title: `Nivel ${nivelActual + 1}`,
		showConfirmButton: false
	})

	for (let i=0; i<=nivelActual; i++) {
		setTimeout(() => 
			activate(teclas[i]), 
			1000 * (i+1) + 1000)
	}

	let i = 0
	let teclaActual = teclas[i]
	window.addEventListener('keydown', onkeydown)

	function onkeydown(ev) {
		if (ev.keyCode == teclaActual) {
			activate(teclaActual, {success : true})
			i++
			if (i > nivelActual) {
				window.removeEventListener('keydown', onkeydown)
				setTimeout( () => siguienteNivel(i), 1500)
			}
			teclaActual = teclas[i]
		} else {
			activate(ev.keyCode, {fail: true})
			window.removeEventListener('keydown', onkeydown)
			swal({
				title: 'Perdiste :´(',
				text: '¿Quieres jugar de nuevo?',
				showCancelButton: true,
				allowEscapeKey: true,
				allowEnterKey: true,
				confirmButtonText: 'Sí',
				cancelButtonText: 'No'
			})
			.then((result) => {
				if(result.value) {
					teclas = generarTeclas(niveles)
					siguienteNivel(0)
				} else {
					swal({
						title: 'Adios',
						confirmButtonColor: '#3085d6'
					})
				}
			})
			
		}
	}
}

siguienteNivel(0)
// swal('Sweet alert')

function generarTeclas(niveles) {
	return new Array(niveles)
				.fill(0)
				.map(generarTeclaAleatoria)
}


function generarTeclaAleatoria() {
	const min = 65
	const max = 90
	return Math.round(Math.random() * (max -min) + min)
}


function getElementByKeyCode(keyCode) {
	return document.querySelector(`[data-key="${keyCode}"]`)
}


function activate(keyCode, opts = {}) {
	const el = getElementByKeyCode(keyCode)
	el.classList.add('active')
	if (opts.success === true) {
		el.classList.add('success')
	} else if (opts.fail) {
		el.classList.add('fail')
	}
	setTimeout( () => deactivate(el), 500)
}


function deactivate(el) {
	el.className = 'key'
}