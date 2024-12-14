import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { removeFromCart } from '../../slices/cartSlice';
import { fetchBooksAsync } from '../../slices/booksSlice';

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Récupérer les livres et les IDs du panier depuis Redux
  const books = useSelector((state: RootState) => state.books.books);
  const cartBookIds = useSelector((state: RootState) => state.cart.cartBookIds);
  const booksStatus = useSelector((state: RootState) => state.books.status);

  // Charger les livres si nécessaire
  useEffect(() => {
    if (booksStatus === 'idle') {
      dispatch(fetchBooksAsync());
    }
  }, [dispatch, booksStatus]);

  // Filtrer les livres présents dans le panier
  const cartBookData = books.filter((book) => cartBookIds.includes(book.id));

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="cart">
      {booksStatus === 'loading' && <div>Loading books...</div>}
      {booksStatus === 'failed' && <div>Error loading books</div>}

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
                  onClick={() => handleRemove(book.id)}
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




