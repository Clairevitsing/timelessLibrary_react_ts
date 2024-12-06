import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { removeFromCart } from '../../slices/cartSlice';

const Cart: React.FC = () => {
  const dispatch = useDispatch();

  // Get books and cartBookIds from the Redux store
  const books = useSelector((state: RootState) => state.books.books);
  const cartBookIds = useSelector((state: RootState) => state.cart.cartBookIds);

  // Log books and cartBookIds to verify data
  console.log('Books from Redux:', books);
  console.log('Cart Book IDs:', cartBookIds);

  // Filter the books that are in the cart
  const cartBookData = books.filter((book) => cartBookIds.includes(book.id));

  // Log filtered cart data
  console.log('Filtered Cart Book Data:', cartBookData);

  return (
    <div className="cart">
      {cartBookData.length > 0 ? (
        <div className="cart-book">
          <h3 className="header">Items in Cart</h3>
          {cartBookData.map((book) => (
            <div key={book.id} className="row mb-3">
              <img className="item-image" src={book.image} alt={book.title} />
              <div className="item-info ms-3">
                <h4>{book.title}</h4>
                <p className="text-truncate">{book.ISBN}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => dispatch(removeFromCart(book.id))}
                >
                  <i className="bi bi-trash-fill" /> Remove Item
                </button>
              </div>
            </div>
          ))}
          <h4 className="mt-3">Total Items: {cartBookData.length}</h4>
        </div>
      ) : (
        <div className="text-center empty-cart">
          <i className="bi bi-cart3" style={{ fontSize: '2rem' }} />
          <p>Your cart is empty.</p>
          <p>You have not added any items to your cart.</p>
        </div>
      )}
    </div>
  );
};

export default Cart;


