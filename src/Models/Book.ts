import { Author } from './Author';
import { Category } from './Category';

export interface Book {
  id: number;
  title: string;
  ISBN: string;
  publishedYear: Date;
  description: string;
  image: string;
  available: boolean;
  authors: Author[]; 
  category?: Category;  
}