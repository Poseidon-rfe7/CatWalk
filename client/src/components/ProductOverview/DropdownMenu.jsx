import React, {useState, useEffect} from 'react';
import {CSSTransition} from 'react-transition-group';


function DropdownMenu (props) {
  const [activeMenu, setActiveMenu] = useState('Size');
  const [sku, setSku] = useState({});
  const [quantity, setQuantity] = useState([]);


  useEffect(() => {

    if (sku !== {}) {
      let array = [];
      for (let i=1; i <= sku.quantity; i++) {
        array.push(i);
      }
      setQuantity(array)
      props.setSelection(sku.size || 'Select Size')
    }

  }, [sku])



  // Another Component
  function DropdownItem(props) {
    return (
      <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button" onClick={() => props.cSku?setSku(props.cSku):props.setIsOpen(true)}> {props.children} </span>
      </a>
    );
  }
  // Another Component

  return (
    <div className='dropdown-menu'>

      <CSSTransition
        in={activeMenu === 'Size'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit>
        <div className="menu">

          {props.available.map((sku) => {
            return <DropdownItem
            key={sku + sku.quantity}
            goToMenu='quantity'
            cSku={sku}
            setSelect={props.setSelection}
            >
            {sku.size}
            </DropdownItem>
          })}

        </div>
      </CSSTransition>


      <CSSTransition

        in={activeMenu === 'quantity'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit>

        <div className="menu">

          {quantity.map((quantity) => {
            return <DropdownItem key={quantity + 1} setIsOpen={props.setIsOpen} goToMenu='size'> {quantity} </DropdownItem>
          })}

        </div>

      </CSSTransition>

      </div>
  )
}

export default DropdownMenu;