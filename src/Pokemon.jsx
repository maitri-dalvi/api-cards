import { useEffect } from "react";
import "./index.css";
const Pokemon = () => {

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
    </>
  )
}

export default Pokemon