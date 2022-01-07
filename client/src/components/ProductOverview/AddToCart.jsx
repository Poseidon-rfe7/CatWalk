import React, {useState, useEffect} from 'react';
import NavBar from './NavBar.jsx'
import NavForm from './NavForm.jsx'
import DropdownMenu from './DropdownMenu.jsx'
import Modal from './Modal.jsx';
import ReactModal from 'react-modal';



const AddToCart = (props) => {

  const [available, setAvailable] = useState([]);
  const [selection, setSelection] = useState('Select Size');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (props.skus) {
      for (let i in props.skus) {
        if (props.skus[i].quantity > 0) {
          available.push(props.skus[i]);
        }
      }
    }
  }, [props.skus])

  return (


    <div className='addToCart-container'>


        <NavBar>
          <NavForm icon={selection}>
            <DropdownMenu
            available={available}
            setSelection={setSelection}
            selection={selection}
            setIsOpen={setIsOpen}
            >
            </DropdownMenu>
          </NavForm>
        </NavBar>

        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <h3 className={'modalConfirmation'}>
            <p>{`Your size: ${selection}`}</p>
            <p>{`Your Style: ${props.style.name}`}</p>
            <p>{`The Price: ${props.style.original_price}`}</p>
            </h3>
        </Modal>


      Add To Cart!
    </div>
  )
}

export default AddToCart;