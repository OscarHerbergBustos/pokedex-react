import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PokedexItem from './PokedexItem';
import PokedexPagination from './PokedexPagination.js';
import './Pokedex.css';


function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon');
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(currentPageUrl)
      .then(res => res.json())
      .then(data => {
        setIsLoading(false);
        setNextPageUrl(data.next);
        setPrevPageUrl(data.previous);
        setPokemonList(data.results.map(result => ({
          name: result.name,
          url: result.url,
        })));
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }, [currentPageUrl]);

  const goToNextPage = () => {
    setCurrentPageUrl(nextPageUrl);
  };

  const goToPrevPage = () => {
    setCurrentPageUrl(prevPageUrl);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pokedex">
      <h1>Pokedex</h1>
      <Link to="/about">About</Link>
      <div className="pokedex-grid">
        {pokemonList.map(pokemon => (
          <Link to={`/pokemon/${pokemon.name}`} key={pokemon.name}>
            <PokedexItem pokemon={pokemon} />
          </Link>
          
        ))}
      </div>
      <PokedexPagination
        goToNextPage={goToNextPage}
        goToPrevPage={goToPrevPage}
        prevPageUrl={prevPageUrl}
        nextPageUrl={nextPageUrl}
      />
    </div>
  );
  
  
  
}

export default Pokedex;
