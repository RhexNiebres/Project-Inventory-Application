
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
    res.render('index', { title: "Welcome to PokéVualt" });
};

exports.getPokemons= (req, res) => {
    res.render('pokemon', { pokemons});
};

exports.getTrainers = (req, res) => {
    res.render('trainers', { trainers });
};

exports.getAddPokemon = (req, res) =>{
    res.render('addPokemon')
}

exports.postAddPokemon = (req, res) => {
    const { name, type } = req.body;
    pokemons.push({ id: pokemons.length + 1, name, type });
    res.redirect('/pokemon');
};

exports.getAddTrainer = (req, res) =>{
    res.render('addTrainers')
}

exports.postAddTrainer = (req, res) => {
    const { name, region } = req.body;
    trainers.push({ id: trainers.length + 1, name, region });
    res.redirect('/trainers');
};

