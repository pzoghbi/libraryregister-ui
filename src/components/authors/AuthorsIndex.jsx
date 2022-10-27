import { useEffect, useState } from 'react'
import AuthorCard from './AuthorCard';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function AuthorsIndex() {
    let [authors, setAuthors] = useState([])
    let [page, setPage] = useState({ index: 1, count: 5})
    let [pageData, setPageData] = useState({})
    const navigate = useNavigate();

    let authorsApiRoute = "https://localhost:7009/api/authors"

    useEffect(() => {
        getAuthors();
    }, [page])

    const getAuthors = () => {
        axios.get(authorsApiRoute, { params: { pageIndex : page.index, pageSize : page.count } })
            .then(response => {
                let _page = response.data;
                setAuthors(_page.list);
                setPageData({ 
                    hasPrev : _page.hasPreviousPage,
                    hasNext : _page.hasNextPage
                })                
            })
            .catch(e => console.log(e));
    }

    const toAuthorCreate = () => {
        navigate("create");
    }

    return authors && (
        <div className="AuthorsIndex">
            <div onClick={toAuthorCreate} className='btn'>add new author</div>

            <label htmlFor="resultsPerPage">Rezultata po stranici</label>
            <select name="resultsPerPage" onChange={(e) => 
                setPage( { ...page, count : parseInt(e.target.value) } )}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>

            { authors?.map((author, i) => <AuthorCard key={i} {...author} />) }

            { pageData.hasPrev && 
                (<div className="btn" onClick={() => setPage( { ...page, index: page.index-1 } )}>
                    Prethodna strana
                </div>) }

            { pageData.hasNext && 
                (<div className="btn" onClick={() => setPage( { ...page, index : page.index+1 } )}>
                    Slijedeća strana
                </div>) }
        </div>
    )
}
