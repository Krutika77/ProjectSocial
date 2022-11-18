import { useEffect, useRef, useState } from "react";
import { Return, Search } from "../../svg";
import useClickOutside from "../../helpers/clickOutside";
import {
  addToSearchHistory,
  getSearchHistory,
  removeFromSearch,
  search,
} from "../../functions/user";
import { Link } from "react-router-dom";

export default function SearchUsers({ color, setshowSearchUser, token }) {
  const [iconVisible, setIconVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const menu = useRef(null);
  const input = useRef(null);
  // hides the search menu when clicked outside
  useClickOutside(menu, () => {
    setshowSearchUser(false);
  });
  // updates search history when a search has been made
  useEffect(() => {
    getHistory();
  }, []);
  // retrieves search history
  const getHistory = async () => {
    const res = await getSearchHistory(token);
    setSearchHistory(res);
  };
  // gets the search input from the text area
  useEffect(() => {
    input.current.focus();
  }, []);
  // takes the search term and displays results from the database
  const searchHandler = async () => {
    if (searchTerm === "") {
      setResults("");
    } else {
      const res = await search(searchTerm, token);
      setResults(res);
    }
  };
  // adds previous searches to the search history
  const addToSearchHistoryHandler = async (searchUser) => {
    const res = await addToSearchHistory(searchUser, token);
    getHistory();
  };
  // removes selected items from the search history
  const handleRemove = async (searchUser) => {
    removeFromSearch(searchUser, token);
    getHistory();
  };

  return (
    <div className="input_search scrollbar" ref={menu}>
      <div className="input_search_wrap">
        <div
          className="circle hover1"
          onClick={() => {
            setshowSearchUser(false);
          }}
        >
          <Return color={color} />
        </div>
        <div
          className="search_user"
          onClick={() => {
            input.current.focus();
          }}
        >
          {/* Search icon is removed when clicked on the input field */}
          {iconVisible && (
            <div>
              <Search color={color} />
            </div>
          )}
          <input
            type="text"
            placeholder="Search Social"
            ref={input}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={searchHandler}
            onFocus={() => {
              setIconVisible(false);
            }}
            onBlur={() => {
              setIconVisible(true);
            }}
          />
        </div>
      </div>
      {/* displaying search history */}
      {results == "" && (
        <div className="recent_searches_header">
          <span>Recent searches</span>
        </div>
      )}
      <div className="recent_searches scrollbar">
        {searchHistory &&
          results == "" &&
          searchHistory
            .sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            })
            .map((user) => (
              <div className="search_item hover1" key={user._id}>
                <Link
                  className="flex"
                  to={`/profile/${user.user.username}`}
                  onClick={() => addToSearchHistoryHandler(user.user._id)}
                >
                  <img src={user.user.picture} alt="" />
                  <span>
                    {user.user.first_name} {user.user.last_name}
                  </span>
                </Link>
                <i
                  className="exit_icon"
                  onClick={() => {
                    handleRemove(user.user._id);
                  }}
                ></i>
              </div>
            ))}
      </div>
      {/* displaying current search results */}
      <div className="search_results scrollbar">
        {results &&
          results.map((user) => (
            // clicking on any of the search results takes the user to that person's profile page
            <Link
              to={`/profile/${user.username}`}
              className="search_item hover1"
              onClick={() => addToSearchHistoryHandler(user._id)}
              key={user._id}
            >
              <img src={user.picture} alt="" />
              <span>
                {user.first_name} {user.last_name}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
}
