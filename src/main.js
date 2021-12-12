const pokeRandom = (pokemon) => {

    let numero;
    if (typeof pokemon == 'number' || typeof pokemon == 'string') {
        numero = pokemon;
    } else {
        numero = Math.round(Math.random() * (151 - 1) + 1);
    }

    const pokeurl = `https://pokeapi.co/api/v2/pokemon/${numero}`;

    const pokeData = fetch(pokeurl)
        .then(response => response.json())
        .then(pokemon => {
            console.log(pokemon);

            let img = document.getElementById('sprite');
            let pesoTransformado = pokemon.weight / 10;
            let tamanhoTransformado = pokemon.height / 10;
            img.src = `${pokemon.sprites.front_default}`;
            document.getElementById('pokes').innerHTML = `Nome: ${pokemon.name}`;
            document.getElementById('peso').innerHTML = `Peso: ${pesoTransformado} KG`;
            document.getElementById('tamanho').innerHTML = `Tamanho: ${tamanhoTransformado} M`;

            for (let i = 0; i < 5; i++) {
                document.getElementById(`types${i}`).innerHTML = ` `;
            };
            for (let i = 0; i < pokemon.abilities.length; i++) {
                document.getElementById(`hab${i}`).innerHTML = ` `;
            };

            const stats = pokemon.stats;

            for (let i = 0; i < 6; i++) {
                document.getElementById(`stats${i}`).innerHTML = `${pokemon.stats[i].stat.name}: ${pokemon.stats[i].base_stat}`;
            };
            for (let i = 0; i < pokemon.types.length; i++) {
                document.getElementById(`types${i}`).innerHTML = `${pokemon.types[i].type.name}`;
            };
            for (let i = 0; i < pokemon.abilities.length; i++) {
                document.getElementById(`hab${i}`).innerHTML = `${pokemon.abilities[i].ability.name}`;
            };

        })
}

const pokeSearch = (nome) => {
    console.log(nome);
    const pokeurl = `https://pokeapi.co/api/v2/pokemon/${nome.toLowerCase()}`;

    fetch(pokeurl)
        .then(response => response.json())
        .then(pokemon => {
            console.log(pokemon);

            let img = document.getElementById('sprite');
            let pesoTransformado = pokemon.weight / 10;
            let tamanhoTransformado = pokemon.height / 10;
            img.src = `${pokemon.sprites.front_default}`;
            document.getElementById('pokes').innerHTML = `Nome: ${pokemon.name}`;
            document.getElementById('peso').innerHTML = `Peso: ${pesoTransformado} KG`;
            document.getElementById('tamanho').innerHTML = `Tamanho: ${tamanhoTransformado} M`;

            for (let i = 0; i < 5; i++) {
                document.getElementById(`types${i}`).innerHTML = ` `;
            };
            for (let i = 0; i < pokemon.abilities.length; i++) {
                document.getElementById(`hab${i}`).innerHTML = ` `;
            };

            for (let i = 0; i < 6; i++) {
                document.getElementById(`stats${i}`).innerHTML = `${pokemon.stats[i].stat.name}: ${pokemon.stats[i].base_stat}`;
            };
            for (let i = 0; i < pokemon.types.length; i++) {
                document.getElementById(`types${i}`).innerHTML = `${pokemon.types[i].type.name}`;
            };
            for (let i = 0; i < pokemon.abilities.length; i++) {
                document.getElementById(`hab${i}`).innerHTML = `${pokemon.abilities[i].ability.name}`;
            };
        })

}

export { pokeRandom, pokeSearch };