import { useEffect, useState } from "react";
import "./index.css";
import PokemonCards from "./PokemonCards";
const Pokemon = () => {

    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');

    const API = "https://pokeapi.co/api/v2/pokemon?limit=64";
    const fetchPokemon = async () => {
        

        try {
            const res = await fetch(API);
            const data = await res.json();


            // fetched 1000+ urls (url inside url)
            const pokemonDetailedData = data.results.map( async (currPokemon) => {
                const res = await fetch(currPokemon.url);
                const data = await res.json();
                return data;                
            });

            const detailedResponses = await Promise.all(pokemonDetailedData);
            setPokemon(detailedResponses);
            // console.log(detailedResponses);
            setLoading(false);
            
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };
    useEffect(() => {
        fetchPokemon();
    }, []);

    //Search

    const searchData = pokemon.filter((currPokemon) => currPokemon.name.toLowerCase().includes(search.toLowerCase()));

    if(loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    if(error) {
        return (
            <div>
                <h1>Error: {error.message}</h1>
            </div>
        );
    }

  return (
    <>
    <section className="container ">
        <header>
            <h1>
                Let's Catch Them All!
            </h1>
        </header>
        <div className="pokemon-search">
            <input type="text" placeholder="Search Pokemon..." value={search} onChange={(e) => setSearch(e.target.value)}/>

        </div>
        <div>
            <ul className="cards">
                {
                    searchData.map((currPokemon) => {
                        return (
                            <PokemonCards key={currPokemon.id} pokemonData={currPokemon} />
                        );
                    })
                }
            </ul>
        </div>
    </section>
    </>
  )
}

export default Pokemon