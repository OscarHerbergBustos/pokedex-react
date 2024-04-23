import React from 'react';

const PokedexPagination = ({ goToNextPage, goToPrevPage, prevPageUrl, nextPageUrl }) => {
  return (
    <div>
      {prevPageUrl && <button onClick={goToPrevPage}>Previous</button>}
      {nextPageUrl && <button onClick={goToNextPage}>Next</button>}
    </div>
  );
};

export default PokedexPagination;