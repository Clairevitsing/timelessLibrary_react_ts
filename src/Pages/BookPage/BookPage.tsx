import React, { useState, useEffect } from 'react';
import { fetchBooks } from '../../Services/BookService';
import { Book } from '../../Models/Book';
import { useNavigate } from 'react-router-dom';  

const BookPage: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    useEffect(() => {
        fetchBooks().then(books => {
            setBooks(books);
            setIsLoading(false);
        }).catch(error => {
            console.error('Error loading books:', error);
            setError(`Failed to load books: ${error.message || JSON.stringify(error)}`);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleDetailsClick = (id: number) => {
         // Navigate to the book detail page
         navigate(`/book/${id}`); 
    };

    return (
        <div className="container mt-4">
            <h2>All the Books</h2>
            <div className="row">
                {books.map(book => (
                    <div key={book.id} className="col-sm-6 col-md-4 col-lg-3 mb-3">
                        <div className="card">
                            <img src={book.image} className="card-img-top" alt={book.title} />
                            <div className="card-body">
                                <h5 className="card-title">{book.title}</h5>
                                {/* <p className="card-text">{book.description}</p> */}
                                <ul>
                                    {book.authors.map(author => (
                                        <li key={author.id}>{author.firstName} {author.lastName}</li>
                                    ))}
                                </ul>
                                 <button className="btn btn-primary" onClick={() => handleDetailsClick(book.id)}>Details</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookPage;