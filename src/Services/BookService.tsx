// src/services/BookService.tsx
import axios from 'axios';
import { Book } from '../Models/Book';

const BASE_API_URL = "http://127.0.0.1:8000/api/books";

export const fetchNewBooks = async (): Promise<Book[]> => {
    try {
        const response = await axios.get(`${BASE_API_URL}/recent`);
        return response.data.books.map((bookData: any) => ({
            ...bookData,
            publishedYear: new Date(bookData.publishedYear),
            authors: bookData.authors,
            category: bookData.category
        }));
    } catch (error) {
        console.error('Error fetching new books:', error);
        throw new Error('Failed to fetch new books');
    }
};


export const fetchBookDetails = async (bookId: number): Promise<Book> => {
    try {
        const response = await axios.get(`${BASE_API_URL}/${bookId}`);
        const bookData = response.data;
        return {
            ...bookData,
            publishedYear: new Date(bookData.publishedYear), 
            authors: bookData.authors,
            category: bookData.category
        };
    } catch (error) {
        console.error('Error fetching book details:', error);
        throw new Error('Failed to fetch book details');
    }
};