// src/services/BookService.tsx
import axios from 'axios';
import { Book, NewBookData } from '../Models/Book';

const BASE_API_URL = "http://127.0.0.1:8000/api/books";

export const fetchBooks = async (): Promise<Book[]> => {
    try {
      const response = await axios.get(`${BASE_API_URL}`);
      if (!response.data || !response.data.books) {
            throw new Error('No books data found in response');
        }
        return response.data.books.map((bookData: any) => ({
            ...bookData,
            publishedYear: new Date(bookData.publishedYear),
            authors: bookData.authors,
            category: bookData.category
        }));
    } catch (error) {
        console.error('Error fetching books:', error);
        throw new Error('Failed to fetch books');
    }
};

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

export const fetchBookDetailsForEdit = async (bookId: number): Promise<Book> => {
  try {
    const response = await axios.get(`${BASE_API_URL}/${bookId}/edit`);
    const bookData: Book = response.data;
    return bookData;
  } catch (error) {
    console.error('Error fetching book details for edit:', error);
    throw new Error('Failed to fetch book details for editing');
  }
};

export const createNewBook = async (bookData: NewBookData): Promise<Book> => {
    try {
        const response = await axios.post(`${BASE_API_URL}/new`, bookData);
        const newBook: Book = response.data;
        console.log('New book created:', newBook);
        return newBook;
    } catch (error) {
        console.error('Failed to create book:', error);
        throw new Error('Failed to create new book');
    }
}