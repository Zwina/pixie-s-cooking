import React, {useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const SearchBox = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    // Effectuez une action de recherche ici en utilisant la valeur de "searchTerm"
    console.log(`Recherche pour "${searchTerm}"`);
    // <Navigate to={`/recherche/${searchTerm}`} />
    navigate(`/recherche/${searchTerm}`);
  };

  return (
        <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <Button type="submit" variant="outline-warning">Search</Button>
          </Form>
  )
}

export default SearchBox