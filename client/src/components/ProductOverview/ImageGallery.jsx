import React, {useState, useEffect} from 'react';

const ImageGallery = (props) => {

  const [url, setUrl] = useState('');
  const [thumbnails, setThumbnails] = useState([]);
  const [mainID, setMainID] = useState('mainImg');
  const [proxyID, setProxyID] = useState('');

   useEffect(() => {
    if (props.currentPhotos) {
      let thumbnailsUrl = props.currentPhotos.slice(1, props.currentPhotos.length)
      setUrl(props.currentPhotos[0].url);
      setThumbnails(thumbnailsUrl)
    }
  }, [props.currentPhotos])

  useEffect(() => {
    if (proxyID) {
      let proxyUrl = document.getElementById(proxyID).src;
      document.getElementById(proxyID).src = url;
      document.getElementById(proxyID).id = mainID;
      setMainID(proxyID);
      setUrl(proxyUrl);
    }
  }, [proxyID])

  return (
    <div className='image-gallery-container'>

      <div>
        <figure className={'galleryFigure'}>
          <img
          src={url}
          id={mainID}
          />
          <figcaption className={'styleCaption'}>{props.styleName}</figcaption>
        </figure>
      </div>


      <ul className={'gallery_thumbnailsUl'}>
        {thumbnails.map((thumbnail, i) => {
          return <li key={`${i}  ${thumbnail.thumbnail_url}`}>
            <img
            src={thumbnail.thumbnail_url}
            className={'galleryThumbnail'}
            id={thumbnail.thumbnail_url}
            onClick={(e) => setProxyID(e.target.id)}/>
          </li>
        })}
      </ul>


      <h2>Select a Picture!</h2>
    </div>
  )
}

export default ImageGallery