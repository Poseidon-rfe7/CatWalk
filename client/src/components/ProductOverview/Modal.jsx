import React from 'react';
import ReactDom from 'react-dom'

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 1000
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}

export default function Modal({ open, children, onClose }) {

  if (!open) return null

  return ReactDom.createPortal(
    <>
<div class="modal-box">
  <h2 style={{color: 'aqua'}}>Confirm Selections</h2>
  {children}
  <form>
    <a
    href="#"
    onClick={onClose}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      AddToCart
    </a>
  </form>
</div>
    </>,
    document.getElementById('addToCartModal')
  )
}

