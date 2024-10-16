// src/services/BookService.tsx
import axios from 'axios';
import { Book, NewBookData } from '../Models/Book';
import { Author } from '../Models/Author';

const BASE_API_URL = "http://127.0.0.1:8000/api/books";

export const fetchBooks = async (): Promise<Book[]> => {
    try {
        const response = await axios.get(`${BASE_API_URL}`);
        console.log("API response:", response.data);

        if (!response.data || !Array.isArray(response.data)) {
            throw new Error('No books data found in response or response format is incorrect');
        }

        return response.data.map((bookData: any): Book => ({
            id: bookData.id,
            title: bookData.title,
            ISBN: bookData.ISBN,
            image: bookData.image,
            description: bookData.description,
            available: bookData.available,
            authors: bookData.authors.map((author: any): Author => ({
                id: author.id,
                firstName: author.firstName,
                lastName: author.lastName,
                biography: author.biography,
                birthDate: new Date(author.birthDate)
            })),
            category: {
                id: bookData.category.id,
                name: bookData.category.name,
                description: bookData.category.description
            },
            publishedYear: new Date(bookData.publishedYear) 
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