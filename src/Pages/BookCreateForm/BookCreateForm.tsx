import React, { useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { NewBookData } from '../../Models/Book';

const bookSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  ISBN: Yup.string().required('ISBN is required'),
  publishedYear: Yup.date().required('Published year is required'),
  description: Yup.string().required('Description is required'),
  image: Yup.string().url('Must be a valid URL').required('Image URL is required'),
  available: Yup.boolean().required('Availability is required'),
  categoryId: Yup.number()
    .required('Category ID is required')
    .integer('Category ID must be an integer')
    .min(1, 'Category ID must be at least 1'),
    authorIds: Yup.array().of(Yup.number().required('Valid author ID is required')).required('At least one author is required')
});

const BookCreateForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<NewBookData>({
    resolver: yupResolver(bookSchema),
      defaultValues: {
        // Ensure booleans are initialized
          available: false, 
          // Ensure arrays are initialized
      authorIds: [], 
    }
  });

    // Ensure to set up form fields properly, especially for handling arrays or multiple values
    useEffect(() => {
      // This is necessary if authorIds is handled specially, like checkboxes
    register('authorIds');  
  }, [register]);

  const onSubmit = (data: NewBookData) => {
    console.log('Book data:', data);
    // Implement call to API here
  };

  return (
     <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Title</label>
        <input {...register('title')} placeholder="Title" />
        {errors.title && <p>{errors.title.message}</p>}
      </div>
      <div>
        <label>ISBN</label>
        <input {...register('ISBN')} placeholder="ISBN" />
        {errors.ISBN && <p>{errors.ISBN.message}</p>}
      </div>
      <div>
        <label>Published Year</label>
        <input type="date" {...register('publishedYear')} />
        {errors.publishedYear && <p>{errors.publishedYear.message}</p>}
      </div>
      <div>
        <label>Description</label>
        <textarea {...register('description')} placeholder="Description" />
        {errors.description && <p>{errors.description.message}</p>}
      </div>
      <div>
        <label>Image URL</label>
        <input {...register('image')} placeholder="Image URL" />
        {errors.image && <p>{errors.image.message}</p>}
      </div>
      <div>
        <label>Availability</label>
        <input type="checkbox" {...register('available')} />
      </div>
      <div>
        <label>Category ID</label>
        <input type="number" {...register('categoryId')} placeholder="Category ID" />
        {errors.categoryId && <p>{errors.categoryId.message}</p>}
      </div>
      <div>
        <label>Author IDs (comma-separated)</label>
        <input {...register('authorIds')} placeholder="Author IDs" />
        {errors.authorIds && <p>{errors.authorIds.message}</p>}
      </div>
      <button type="submit">Create Book</button>
    </form>
  );
};

export default BookCreateForm;