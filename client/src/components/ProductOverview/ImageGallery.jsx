import React, {useState, useEffect} from 'react';
import ExpandedViewModal from './ExpandedViewModal.jsx';

const ImageGallery = (props) => {

  const [url, setUrl] = useState('');
  const [thumbnails, setThumbnails] = useState([]);
  const [mainID, setMainID] = useState('mainImg');
  const [proxyID, setProxyID] = useState('');
  const [isOpen, setIsOpen] = useState(false);

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

      <ul className={'gallery_thumbnailsUl'}>
        {thumbnails.map((thumbnail, i) => {
          return <li key={`${i}  ${thumbnail.thumbnail_url}`}>
            <img
            src={thumbnail.thumbnail_url}
            className={'galleryThumbnail galleryStyle'}
            id={thumbnail.thumbnail_url}
            onClick={(e) => setProxyID(e.target.id)}/>
          </li>
        })}
      </ul>

      <div>
        <figcaption className={'styleCaption'}>{props.styleName}</figcaption>
        <figure className={'galleryFigure'}>
          <img
            src={url}
            id={mainID}
            onClick={setIsOpen}
          />
        </figure>
        <ExpandedViewModal open={isOpen} onClose={() => setIsOpen(false)}>
          <h3 className={'modalConfirmation'}>
          <img
            src={url}
          />
            </h3>
        </ExpandedViewModal>
      </div>



    </div>
  )
}

export default ImageGallery