import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then((response) => response.json())
      .then((data) => {
        setPokemonList(data.results);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load Pokémon list");
        setLoading(false);
      });
  }, []);

  const fetchPokemonDetails = async (name) => {
    try {
      setDetailsLoading(true);

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );

      const data = await response.json();

      setSelectedPokemon(data);
      setDetailsLoading(false);
    } catch {
      setError("Failed to load Pokémon details");
      setDetailsLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="container">
      <h1>Pokédex</h1>

      <div className="layout">
        <div className="pokemon-list">
          {pokemonList.map((pokemon) => (
            <button
              key={pokemon.name}
              onClick={() => fetchPokemonDetails(pokemon.name)}
            >
              {pokemon.name}
            </button>
          ))}
        </div>

        <div className="details">
          {detailsLoading && <h3>Loading Details...</h3>}

          {selectedPokemon && (
            <div className="card">
              <h2>
                {selectedPokemon.name} (#{selectedPokemon.id})
              </h2>

              <img
                src={selectedPokemon.sprites.front_default}
                alt={selectedPokemon.name}
              />

              <h3>Types</h3>
              <ul>
                {selectedPokemon.types.map((type) => (
                  <li key={type.type.name}>
                    {type.type.name}
                  </li>
                ))}
              </ul>

              <h3>Abilities</h3>
              <ul>
                {selectedPokemon.abilities.map((ability) => (
                  <li key={ability.ability.name}>
                    {ability.ability.name}
                  </li>
                ))}
              </ul>

              <h3>Base Stats</h3>
              <ul>
                {selectedPokemon.stats.map((stat) => (
                  <li key={stat.stat.name}>
                    {stat.stat.name}: {stat.base_stat}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
