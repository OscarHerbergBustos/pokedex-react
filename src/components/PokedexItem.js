import React, { useState, useEffect } from 'react';


const PokedexItem = ({ pokemon }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetch(pokemon.url)
      .then(res => res.json())
      .then(data => setImageUrl(data.sprites.front_default))
      .catch(error => console.error(error));
  }, [pokemon.url]);

  return (
    <div className="pokedex-item">
      {imageUrl ? (
        <img src={imageUrl} alt={pokemon.name} />
      ) : (
        <div>No image available</div>
      )}
      <div className="pokedex-item-name">{pokemon.name}</div>
    </div>
  );
};

export default PokedexItem;
