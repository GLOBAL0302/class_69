import React, { useState } from 'react';

import Modal from '../Modal/Modal';
import { useNavigate } from 'react-router-dom';
import CartDishes from './CartDishes';
import {useSelector} from "react-redux";
import {useAppSelector} from "../../reduxFiles/hooks.ts";
import {selectCartDishes} from "../../reduxFiles/reduxSlices/cartSlice.ts";

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const cartDishes = useAppSelector(selectCartDishes)

  let cart = (
    <div className="alert alert-primary">Cart is empty! Add something!</div>
  );

  if (cartDishes.length > 0) {
    cart = (
      <>
        <CartDishes cartDishes={cartDishes} />
        <button
          className="w-100 btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          Order
        </button>
      </>
    );
  }

  return (
    <>
      <h4>Cart</h4>
      {cart}
      <Modal show={showModal} title="Order" onClose={() => setShowModal(false)}>
        <div className="modal-body">
          <p>Do you want to continue to checkout?</p>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-danger"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="btn btn-success"
            onClick={() => navigate('/checkout')}
          >
            Continue
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Cart;
