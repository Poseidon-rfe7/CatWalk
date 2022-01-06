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

  console.log(props.style)

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
          {`Confirm your size:${selection}, your style: ${props.style.name} and the price: ${props.style.original_price}` }
        </Modal>


      Add To Cart!
    </div>
  )
}

export default AddToCart;