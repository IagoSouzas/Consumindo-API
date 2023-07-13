const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonName = document.querySelector('.pokemon_name');
const pokemonImagem = document.querySelector('.pokemon_image');

const form = document.querySelector('.forms')
const input = document.querySelector('.input_search')
const btnNext = document.querySelector('.btn-next')
const btnPrev = document.querySelector('.btn-prev')

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (apiResponse.status === 200) {
        const data = await apiResponse.json();
        return data;
    }

}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImagem.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImagem.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        
    } else {
        pokemonImagem.style.display = 'none';
        pokemonName.innerHTML = 'Not found :c'
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());

});

btnNext.addEventListener('click', () => {

    searchPokemon += 1;
    renderPokemon(searchPokemon);

});

btnPrev.addEventListener('click', () => {

    if(searchPokemon > 1){
        searchPokemon -= 1;
    }
    renderPokemon(searchPokemon);

});

renderPokemon(searchPokemon);

