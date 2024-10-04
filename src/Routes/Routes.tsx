import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import SearchPage from "../Pages/SearchPage/SearchPage";
import BookPage from "../Pages/BookPage/BookPage";
import Contact from "../Pages/Contact/Contact";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import CategoryPage from "../Pages/CategoryPage/CategoryPage";
import BookDetailPage from "../Pages/BookDetailPage/BookDetailPage";
import Voluptaten from "../Components/Voluptaten/Voluptaten";

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
            
            {
                path: "category/:ticker",
                element: <CategoryPage />, 
                children: [
                    { path: "voluptaten", element: <Voluptaten /> },
                    { path: "login", element: <LoginPage /> },
                    { path: "login", element: <LoginPage /> },
                    { path: "login", element: <LoginPage /> },
                    { path: "login", element: <LoginPage /> },
                ]
            },

        ]

    }
]);