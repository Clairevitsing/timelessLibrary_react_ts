import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBookDetails } from '../../Services/BookService';
import { Book } from '../../Models/Book'; 

const BookDetailPage = () => {
    const { id } = useParams();
     // Declare state to hold a Book or null
    const [book, setBook] = useState<Book | null>(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            fetchBookDetails(parseInt(id))
                .then(data => {
                    setBook(data);
                    setLoading(false);
                })
                .catch(err => {
                    setError('Failed to load book details');
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) return <div className="text-center"><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;
    if (!book) return <div>No book found</div>;

    return (
        <div className="container mt-4 d-flex justify-content-center align-items-center" >
             <div className="card" style={{ width: '30rem' }}> 
                <img className="card-img-top" src={book.image} alt={`Cover of ${book.title}`} />
                <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text">{book.description}</p>
                    <p className="card-text">
                        <strong>Status:</strong>
                        <span className={`badge ${book.available ? 'bg-success' : 'bg-warning'}`}>
                            {book.available ? 'Available' : 'Unavailable'}
                        </span>
                    </p>
                </div>
                <ul className="list-group list-group-flush">
                    {book.authors.map((author) => (
                        <li key={author.id} className="list-group-item">
                            {author.firstName} {author.lastName}
                        </li>
                    ))}
                </ul>
                <div className="card-body">
                    <a href="#" className="card-link">Add to Card</a>
                    <a href="#" className="card-link">Edit</a>
                    <a href="#" className="card-link">Delete</a>
                </div>
            </div>
        </div>
    );
};

export default BookDetailPage;