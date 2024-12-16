import axios from 'axios';
import { Book, NewBookData } from '../models/Book';
import { Author } from '../models/Author';

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


// export const fetchBookDetails = async (bookId: number): Promise<Book> => {
//     try {
//         const response = await axios.get(`${BASE_API_URL}/${bookId}`);
//         const bookData = response.data;
//         return {
//             ...bookData,
//             publishedYear: new Date(bookData.publishedYear),
//             authors: bookData.authors,
//             category: bookData.category
//         };
//     } catch (error) {
//         console.error('Error fetching book details:', error);
//         throw new Error('Failed to fetch book details');
//     }
// };

export const fetchBookDetails = async (bookId: number): Promise<Book> => {
    try {
        console.log(`Attempting to fetch book details for ID: ${bookId}`);
        console.log(`Full URL: ${BASE_API_URL}/${bookId}`);

        const response = await axios.get(`${BASE_API_URL}/${bookId}`, {
            timeout: 10000, 
            headers: {
                'Accept': 'application/json'
            }
        });

        console.log('API Response Status:', response.status);
        console.log('Full API Response:', JSON.stringify(response.data, null, 2));

        if (!response.data) {
            console.error('No book data found in response');
            throw new Error('No book data found');
        }

        const bookData = response.data;

        // Validate essential book properties
        if (!bookData.id || !bookData.title) {
            console.error('Invalid book data structure', bookData);
            throw new Error('Invalid book data structure');
        }

        return {
            id: bookData.id,
            title: bookData.title,
            ISBN: bookData.ISBN,
            image: bookData.image,
            description: bookData.description,
            available: bookData.available,
            publishedYear: new Date(bookData.publishedYear),
            authors: bookData.authors || [],
            category: bookData.category || null
        };
    } catch (error: any) {
        console.error('Detailed error fetching book details:', {
            message: error.message,
            code: error.code,
            response: error.response?.data,
            status: error.response?.status
        });

        // Specific error handling
        if (error.response) {
            if (error.response.status === 404) {
                throw new Error(`Book with ID ${bookId} not found`);
            } else if (error.response.status === 500) {
                throw new Error('Server error. Please try again later.');
            }
        } else if (error.request) {
            throw new Error('No response received from server. Check your network connection.');
        } else {
            throw new Error('Error setting up the request. Please try again.');
        }
    }

    // Add this line to explicitly satisfy TypeScript that all code paths return a value
    throw new Error('An unknown error occurred');
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

export const updateBookAvailability = async (id: number, available: boolean) => {
  try {
    const response = await axios.patch(
      `http://127.0.0.1:8000/api/books/${id}/availability`,
      { available }, // Envoi des données au backend
      { headers: { 'Content-Type': 'application/json' } } // En-têtes pour JSON
    );
    return response.data; // Retourne les données reçues du backend
  } catch (error) {
    // Vérification si c'est une erreur Axios
    if (axios.isAxiosError(error)) {
      console.error(
        'Erreur lors de la mise à jour de la disponibilité',
        error.response?.data || error.message
      );
    } else {
      // Pour les autres types d'erreurs
      console.error('Une erreur inattendue est survenue', (error as Error).message);
    }

    throw error; // Relance l'erreur après l'avoir loggée
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