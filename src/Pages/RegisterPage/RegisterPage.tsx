import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAuth } from "../../Context/useAuth";

type RegisterFormsInputs = {
  firstName: string,
  lastName: string,
  userName: string,
  phoneNumber: string,
  email: string,
  password: string,
  role: 'user' | 'admin',
  subStartDate: string,
  subEndDate: string,
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  userName: Yup.string().required('User name is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  role: Yup.string().oneOf(['user', 'admin'], 'Invalid role').required('Role is required'),
  subStartDate: Yup.string().required('Subscription start date is required'),
  subEndDate: Yup.string()
    .test('is-after-start-date', "End date can't be before start date", function(endDate) {
      const startDate = this.parent.subStartDate;
      if (!startDate || !endDate) return true;
      return new Date(endDate) > new Date(startDate);
    })
    .required('Subscription end date is required'),
});

const RegisterForm = () => {
  const { registerUser } = useAuth();
  const [registrationError, setRegistrationError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormsInputs>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      role: 'user',
      subStartDate: new Date().toISOString().slice(0, 16),
      subEndDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().slice(0, 16),
    },
  });

  const onSubmit = (data: RegisterFormsInputs) => {
    setRegistrationError(null);
    console.log('Submitting registration data:', data);

    registerUser(
      data.firstName,
      data.lastName,
      data.userName,
      data.phoneNumber,
      data.email,
      data.password,
      data.role,
      data.subStartDate,
      data.subEndDate

    )
      .then(() => {
        console.log('Registration successful');
        // You can add a success message or redirect the user here
      })
      .catch((error) => {
        console.error('Registration failed:', error);
        setRegistrationError(error.response?.data?.message ||'Registration failed. Please try again.');
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Register</h2>
      {registrationError && (
        <div className="alert alert-danger" role="alert">
          {registrationError}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="text-danger">{errors.firstName.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="text-danger">{errors.lastName.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="userName"
            {...register("userName")}
          />
          {errors.userName && (
            <p className="text-danger">{errors.userName.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            id="phoneNumber"
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && (
            <p className="text-danger">{errors.phoneNumber.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">Role</label>
          <select
            className="form-select"
            id="role"
            {...register("role")}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && (
            <p className="text-danger">{errors.role.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="subStartDate" className="form-label">Subscription Start Date and Time</label>
          <input
            type="datetime-local"
            className="form-control"
            id="subStartDate"
            {...register("subStartDate")}
          />
          {errors.subStartDate && (
            <p className="text-danger">{errors.subStartDate.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="subEndDate" className="form-label">Subscription End Date and Time</label>
          <input
            type="datetime-local"
            className="form-control"
            id="subEndDate"
            {...register("subEndDate")}
          />
          {errors.subEndDate && (
            <p className="text-danger">{errors.subEndDate.message}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;