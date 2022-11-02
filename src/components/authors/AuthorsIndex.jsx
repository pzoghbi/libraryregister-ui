import { useEffect, useState } from 'react'
import AuthorCard from './AuthorCard';
import axios from 'axios';
import { useNavigate } from 'react-router';
import PagingNavigation from '../PagingNavigation';

export default function AuthorsIndex() {
    let [authors, setAuthors] = useState([])
    let [page, setPage] = useState({ index: 1, count: 5 })
    let [pageData, setPageData] = useState({})
    const navigate = useNavigate();

    let authorsApiRoute = "https://localhost:7009/api/authors"

    useEffect(() => {
        getAuthors();
    }, [page])

    const getAuthors = () => {
        axios.get(authorsApiRoute, 
            { 
                params: { 
                    pageIndex : page.index, 
                    pageSize : page.count 
                } 
            })
            .then(response => {
                let currentPage = response.data;
                setAuthors(currentPage.list);
                setPageData({ 
                    hasPrev : currentPage.hasPreviousPage,
                    hasNext : currentPage.hasNextPage,
                    prevPage : () => setPage({ ...page, index : page.index-1 }),
                    nextPage : () => setPage({ ...page, index : page.index+1 })
                })                
            })
            .catch(e => console.log(e));
    }

    const toAuthorCreate = () => {
        navigate("create");
    }

    return (
        <div className="AuthorsIndex">
            <div>
                <label htmlFor="resultsPerPage">Rezultata po stranici</label>
                <select 
                    className="ml-1 mr-1"
                    name="resultsPerPage" 
                    onChange={e => setPage({ ...page, count : e.target.value})}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>

                <div onClick={toAuthorCreate} className='btn'>Dodaj autora</div>
            </div>

            <div className="SearchResults">
                { authors?.map((author, i) => 
                    <AuthorCard key={i} {...author} />) }
                <PagingNavigation {...pageData} />
            </div>
            
            
        </div>
    )
}
