import React from 'react';
import ReactDom from 'react-dom'

export default function ExpandedViewModal({ open, children, onClose }) {

  if (!open) return null

  return ReactDom.createPortal(
    <>
      <div
      class="modal-box"
      onClick={onClose}>
        {children}
      </div>
    </>,
    document.getElementById('addToCartModal')
  )
}

