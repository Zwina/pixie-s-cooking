import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth-context";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import SearchBox from "./searchBox";

function NavScroll() {
  const auth = useContext(AuthContext);

  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" fixed="top">
      <Container fluid>
        <Navbar.Brand href="/" className="text-warning">
        <img
              src="/rabbit-icon.webp"
              // src="https://cdn.pixabay.com/photo/2012/04/24/23/29/rabbit-41119_1280.png"
              width="35"
              height="35"
              className="d-inline-block align-top bg-light me-4 border border-warning border-2 rounded-5"
              alt="logo"
            />
          Pixie's Cooking
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Accueil</Nav.Link>

            {/* <Nav.Link href="/voirtout">Voir tout</Nav.Link> */}

            <NavDropdown title="Recettes" id="basic-nav-dropdown" href="/voirtout">
            <NavDropdown.Item href="/voirtout">Voir tout</NavDropdown.Item>
            <NavDropdown.Divider />
              <NavDropdown.Item href={`/voirparcategories/4`}>
                Accompagnements
              </NavDropdown.Item>
              <NavDropdown.Item href={`/voirparcategories/3`}>
                Desserts
              </NavDropdown.Item>
              <NavDropdown.Item href={`/voirparcategories/1`}>
                Entrées
              </NavDropdown.Item>
              <NavDropdown.Item href={`/voirparcategories/2`}>
                Plats
              </NavDropdown.Item>
              <NavDropdown.Item href={`/voirparcategories/5`}>
                Amuses-Gueules
              </NavDropdown.Item>
              <NavDropdown.Item href={`/voirparcategories/6`}>
                Boissons
              </NavDropdown.Item>
              <NavDropdown.Item href={`/voirparcategories/7`}>
                Confiseries
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/voirparcategories">
                Toutes les catégories
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Thèmes" id="basic-nav-dropdown">
              <NavDropdown.Item href={`/voirpartheme/9`}>
                Cuisine d'hiver
              </NavDropdown.Item>
              <NavDropdown.Item href={`/voirpartheme/1`}>
                Cuisine d'automne
              </NavDropdown.Item>
              <NavDropdown.Item href={`/voirpartheme/11`}>
                Classiques gourmands
              </NavDropdown.Item>
              <NavDropdown.Item href={`/voirpartheme/12`}>
                Cuisine express
              </NavDropdown.Item>
              <NavDropdown.Item href={`/voirpartheme/7`}>
                Cuisine du Maghreb
              </NavDropdown.Item>
              <NavDropdown.Item href={`/voirpartheme/10`}>
                Cuisine asiatique
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/voirparthemes">
                Tous les thèmes
              </NavDropdown.Item>
            </NavDropdown>

            {/* {!auth.isLoggedIn && <Nav.Link href="/login">Connexion</Nav.Link>}

            {auth.isLoggedIn && (
              <Nav.Link onClick={auth.logout}>
                Déconnexion
              </Nav.Link>
            )} */}

            {auth.isLoggedIn && <Nav.Link href="/mesrecettes">Mes recettes</Nav.Link>}

            {auth.isLoggedIn && <Nav.Link href="/ajouterrecette">Ajouter une recette</Nav.Link>}

          </Nav>
          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-warning">Search</Button>
          </Form> */}
          <SearchBox/>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScroll;
