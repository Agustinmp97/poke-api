const retrievePokemon = async () => {
    const name = document.getElementById('pokemon-name').value.toLowerCase().trim('');
    console.time('callPokemon');
    let rawData = {};

    if (name) {
        try {
            rawData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            console.log(rawData.data);
            displayImage(rawData.data.sprites.front_default);
        } catch (error) {
            showError()
            console.error(error)
        }
    }

}
	console.timeEnd('callPokemon');

const showStats = stats => {

}

const displayImage = url => {
    // crear nodo tipo img
    const imgElement = document.createElement('img');
    // agregar atributos
    imgElement.setAttribute('src', url);
    imgElement.setAttribute('width', '200');
    imgElement.setAttribute('height', '200');
    // obtener elemento del DOM
    const divImg= document.getElementById('img-pokemon');
    // agregar el nodo imagen a el div
    divImg.appendChild(imgElement);
}

const showError = () => {
    // selecciono la image
    let imgElement = document.getElementById("img")
    // Le pongo display none para ocultar
    imgElement.style.display = "none";
    // Creo el mensaje de error
    document.getElementById("msj").innerText = "No se encuentra el pokemon ingresado"
    // Despues de tres segundo borro el mensaje
    setTimeout(() => {
        document.getElementById("msj").innerText = ""
    }, 3000);
}

window.onload = () => {
    document.getElementById('get-pokemons').addEventListener('click', retrievePokemon);
    /*
    1- Selecciono el input no el boton
    2- Con el addListener keyup toma el valor por cada tecla que apretamos
    3- el keycode es el valor de la tecla , el enter es el valor trece
    4- si apretan enter ejecuta la funcion para buscar el pokemon
    */
    document.getElementById('pokemon-name').addEventListener('keyup', e => {
        if (e.keyCode === 13) {
            retrievePokemon()
        }
    });
}