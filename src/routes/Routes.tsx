import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage/HomePage";
import SearchPage from "../pages/SearchPage/SearchPage";
import BookPage from "../pages/BookPage/BookPage";
import Contact from "../pages/Contact/Contact";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import CategoryPage from "../pages/CategoryPage/CategoryPage";
import BookDetailPage from "../pages/BookDetailPage/BookDetailPage";
import BookCreateForm from "../pages/BookCreateForm/BookCreateForm";
import BookEditPage from "../pages/BookEditPage/BookEditPage";
// import evenist from "../components/evenist/evenist";
// import porro from "../components/porro/porro";
// import vel from "../components/vel/vel";
// import ethh from "../components/ethh/ethh";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "search", element: <SearchPage /> },
            { path: "book", element: <BookPage /> },
            { path: "contact", element: <Contact /> },
            { path: "login", element: <LoginPage /> },
            { path: "register", element: <RegisterPage /> },
            { path: "logout", element: <HomePage /> },
            { path: "book/:id", element: <BookDetailPage /> },
            { path: "book/edit", element: <BookEditPage /> },
            { path: "book/new", element: <BookCreateForm /> },
            
            // {
            //     path: "category/:ticker",
            //     element: <CategoryPage />, 
            //     children: [
            //         { path: "voluptaten", element: <Voluptaten /> },
            //         { path: "evenist", element: <evenist /> },
            //         { path: "porro", element: <porro /> },
            //         { path: "vel", element: <vel /> },
            //         { path: "ethh", element: <ethh /> },
            //     ]
            // },

        ]

    }
]);