import React from 'react';

const Search = (props) => {
  return (
    <div className='search-questions'>
      <input type='text' placeholder='Have a question? Search for answers...' className='search-bar'></input>
      <button className='qa-button submit-search'>Search</button>
    </div>
  )
};

export default Search;