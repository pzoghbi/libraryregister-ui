import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from           './components/Login'
import App from             './components/App'
import AuthorCreate from    './components/authors/AuthorCreate';
import AuthorsIndex from    './components/authors/AuthorsIndex';
import BooksCreate from     './components/books/BooksCreate';
import BooksIndex from      './components/books/BooksIndex';
import MainMenu from        './components/MainMenu';
import UserCreate from      './components/users/UserCreate';
import UsersIndex from      './components/users/UsersIndex';
import UserProfile from     './components/users/UserProfile';
import BookProfile from './components/books/BookProfile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}></Route>
            <Route path="login" element={<Login />} />
            <Route path="library">
                <Route index element={<MainMenu />}/>
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
                    <Route path="create" element={<BooksCreate />} />
                    <Route path=":id/read" element={<BookProfile />}/>
                    <Route path="edit" />
                </Route>
                <Route path="leasings">
                    <Route index element={<BooksIndex />} />
                    <Route path="create" element={<BooksCreate />} />
                    <Route path="read" />
                    <Route path="edit" />
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
</React.StrictMode>
);
