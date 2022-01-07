import React, {useEffect, useState} from 'react';

const StyleSelector = (props) => {

  const [url, setUrl] = useState('');
  const [proxyID, setProxyID] = useState('');
  const [selected, setSelected] = useState('selected');
  const [stylesThumbails, setStylesThumbnails] = useState([]);

  useEffect(() => {
    if (props.styles.length > 0) {
      let array = [];
      props.styles.map((style) => {
        array.push(style.photos[0].thumbnail_url)
      })
      setStylesThumbnails(array);
    }
  }, [props.styles])

  useEffect(() => {
    if (proxyID) {
      let newStyle = JSON.parse(proxyID);
      props.setStyle(newStyle);
    }
  }, [proxyID])


  return (

    <div className='style-selector-container'>


      <ul className={'style_thumbnailsUl'}>
        {props.styles.map((style, i) => {
          return <li key={`${i}  ${style}`}>
            <img
            src={style.photos[0].thumbnail_url}
            className={'styleThumbnail'}
            id={JSON.stringify(style)}
            onClick={(e) => setProxyID(e.target.id)}/>
          </li>
        })}
      </ul>


      <h2>Select a Style!</h2>
    </div>

  )
}

export default StyleSelector;