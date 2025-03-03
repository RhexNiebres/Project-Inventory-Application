
// sample data to be replaced
const pokemons = [
    { id: 1, name: 'Pikachu', type:'Electric' },
    { id: 2, name: 'Charmander', type:'Fire' },
    { id: 3, name: 'Bulbasaur', type:'Grass/Poison' }
];

const trainers = [
    { id: 1, name: 'Ash', region: 'Kanto' },
    { id: 2, name: 'Misty', region: 'Kanto' },
    { id: 3, name: 'Brock', region: 'Kanto' }
];

exports.getIndex = (req, res) => {
    res.render('index', { title: "Welcome to Pokémon World" });
};

exports.getPokemons= (req, res) => {
    res.render('pokemon', { pokemons});
};

exports.getTrainers = (req, res) => {
    res.render('trainers', { trainers });
};

