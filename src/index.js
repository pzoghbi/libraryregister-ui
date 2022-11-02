import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthorCreate from    './components/authors/AuthorCreate';
import AuthorsIndex from    './components/authors/AuthorsIndex';
import BookCreate from     './components/books/BookCreate';
import BooksIndex from      './components/books/BooksIndex';
import UserCreate from      './components/users/UserCreate';
import UsersIndex from      './components/users/UsersIndex';
import UserProfile from     './components/users/UserProfile';
import BookProfile from     './components/books/BookProfile';
import App from             './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
    <BrowserRouter>
        <Routes>
            {/* <Route path="login" element={<Login />} /> */}
            <Route path="/" element={<App />}>
                <Route path="users">
                    <Route index element={<UsersIndex />} />
                    <Route path="create" element={<UserCreate />} />
                    <Route path=":id/read" element={<UserProfile />} />
                    <Route path="edit" />
                </Route>
                <Route path="authors">
                    <Route index element={<AuthorsIndex />} />
                    <Route path="create" element={<AuthorCreate />} />
                    <Route path="read"/>
                    <Route path="edit" />
                </Route>
                <Route path="books">
                    <Route index element={<BooksIndex />} />
                    <Route path="create" element={<BookCreate />} />
                    <Route path=":id/read" element={<BookProfile />}/>
                    <Route path="edit" />
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
</React.StrictMode>
);
