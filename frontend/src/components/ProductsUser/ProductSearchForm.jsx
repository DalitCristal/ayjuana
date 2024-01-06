import { useState } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const ProductSearchForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!searchTerm.trim()) {
        return;
      }
      const response = await fetch(
        "http://localhost:8080/api/products/search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productName: searchTerm }),
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
        setSearched(true);
        setIsDropdownVisible(true);
      } else {
        console.error("Error al buscar productos:", response.statusText);
        if (response.status === 404) {
          setSearchResults([]);
          setSearched(true);
          setIsDropdownVisible(true);
        }
      }
    } catch (error) {
      console.error("Error al buscar productos:", error.message);
    }
  };

  const handleLinkClick = () => {
    setIsDropdownVisible(false);
    setSearchTerm("");
  };

  return (
    <div className="searcherContainer">
      <form className="headerFormu" onSubmit={handleFormSubmit}>
        <input
          className="inputHerderFormu"
          type="search"
          placeholder="Buscar..."
          aria-label="Search"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button className="btnHeaderFormu" type="submit">
          <SearchIcon />
        </button>
      </form>
      <div className="containerListSearch">
        <ul style={{ display: isDropdownVisible ? "block" : "none" }}>
          {searched &&
            (Array.isArray(searchResults.data) &&
            searchResults.data.length > 0 ? (
              searchResults.data.map((result) => (
                <li
                  className="result"
                  key={result._id}
                  onClick={handleLinkClick}
                >
                  <Link to={`/product/${result._id}`}>
                    <img src={result.thumbnails[0]} alt={result.title} />
                    <h3>{result.title}</h3>
                    <h3>${result.price}</h3>
                  </Link>
                </li>
              ))
            ) : (
              <li className="notFoundSearch">No hay resultados</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductSearchForm;
