import { useEffect, useState } from "react";
import "./index.css";
const Pokemon = () => {

    const [pokemon, setPokemon] = useState([]);


    const API = "https://pokeapi.co/api/v2/pokemon?limit=24";
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
            console.log(detailedResponses);
            
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchPokemon();
    }, []);
  return (
    <>
    <section className="container">
        <header>
            <h1>
                Let's Catch Them All!
            </h1>
        </header>
        <div>
            <ul className="cards">
                {
                    pokemon.map((currPokemon) => {
                        return (
                            <li key={currPokemon.id}>
                                {currPokemon.name}
                            </li>
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