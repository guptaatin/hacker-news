import { useEffect, useState } from 'react';
import { moment } from "moment";
import logo from './logo.svg';
import './App.css';
import Pagination from './components/Pagination';
import Records from './components/Records';

function App() {
  const [data, setData] = useState([])
  const [query, setQuery] = useState("");
  const [tags, setTags] = useState("story");
  const [currentPage, setCurrentPage] = useState(1);
  const [nPages, setNPages] = useState(0);
  const [searchBy, setSearchBy] = useState("search");
  useEffect(() => {
    fetch(`https://hn.algolia.com/api/v1/${searchBy}?tags=${tags}&page=${currentPage}&query=${query}`,
      {
        method: "GET", // POST, PUT, DELETE, etc.
        headers: {
          'Access-Control-Allow-Origin': "*",
          'Access-Control-Allow-Credentials': 'true'
        }
      })
      .then(response => response.json())
      .then(res => {
        setData(res.hits);
        setNPages(res.nbPages);
      })
      .catch(() => {
        ///Exception occured do something
      })
  }, [currentPage, tags, searchBy, query]);
  return (
    <div className="App">
      <div className='whole-wrap'>
        <div className='header-wrap'>
          <img className='header-logo' src={logo} />
          <h2 className='header-name'>Hacker News</h2>
          <input className='header-search' placeholder='Search stories by title, url or author' value={query} onChange={(e) => setQuery(e.target.value)} type="text" />
        </div>
        <div className='search-wrap'>
          <div>
            Search
            <select onChange={(e) => setTags(e.target.value)}>
              <option value="story">All</option>
              <option value="story">Stories</option>
              <option value="comment">Comments</option>
            </select>
            by
            <select onChange={(e) => setSearchBy(e.target.value)}>
              <option value="search">Popularity</option>
              <option value="search_by_date">Date</option>
            </select>
            for
            <select>
              <option value="All Time">All Time</option>
              <option value="Last 24h">Last 24h</option>
              <option value="Past Week">Past Week</option>
              <option value="Past Month">Past Month</option>
              <option value="Past Week">Past Week</option>
              <option value="Custom Range">Custom Range</option>
            </select>
          </div>
          <div>{data.length} results</div>
        </div>
        <div>
          {data.length > 0 && data.map((i) => {
            return (
              <div className='news-wrap'>
                <div className='news-first'><strong>{i.title}</strong>&nbsp;({i.url})</div>
                <div className='news-second'>{i.points} points | {i.author} | {i.num_comments} comments</div>
              </div>
            )
          })}
        </div>
        <Records data={data} />
        <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default App;
