import React from 'react';

function SortOptions(props) {
  return (
    <div id="sort-options-container">
      <div>
        <p>Sorted on&nbsp;</p>
      </div>
      <select name="reviews-dropdown" id="reviews-dropdown" onChange={props.sortChangeHandler}>
        <option value="relevance">relevance</option>
        <option value="newest">newest</option>
        <option value="helpful">helpful</option>
      </select>
    </div>
  )
}

export default SortOptions;