import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const getPokemon = async () => {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      setPokemon(data);
    };
    getPokemon();
  }, [id]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <div>
        <strong>Type:</strong> {pokemon.types.map(type => type.type.name).join(', ')}
      </div>
      <div>
        <strong>Height:</strong> {pokemon.height / 10} m
      </div>
      <div>
        <strong>Weight:</strong> {pokemon.weight / 10} kg
      </div>
      <div>
        <strong>Abilities:</strong> {pokemon.abilities.map(ability => ability.ability.name).join(', ')}
      </div>
      <div>
        <strong>Stats:</strong>
        <ul>
          {pokemon.stats.map(stat => (
            <li key={stat.stat.name}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonDetails;
