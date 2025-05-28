
const PokemonCards = ({pokemonData}) => {
  return (
    <>
    <li className="pokemon-card"> 
        <figure>
            <img src={pokemonData.sprites.other.dream_world.front_default} 
            alt={pokemonData.name}
            className="pokemon-image" />
        </figure>
        <h1 className="pokemon-name">{pokemonData.name}</h1>
    </li>
    </>
  )
}

export default PokemonCards