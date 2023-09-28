import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/auth-hook";
import "../App.css";
import Banner from "../components/banner";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Modal from "react-bootstrap/Modal";

import Container from "react-bootstrap/Container";

function CreateRecette() {
    const { token, login, logout, userId } = useAuth();
  const [libelle, setLibelle] = useState("");
  const [nombre_portion, SetNombre_portion] = useState("");
  const [type_portion, setType_portion] = useState("");
  const [temps_preparation, setTemps_preparation] = useState("");
  const [temps_cuisson, setTemps_cuisson] = useState("");
  const [temps_repos, setTemps_repos] = useState("");
  const [difficulte, setDifficulte] = useState("");
  const [cout, setCout] = useState("");
  const [commentaire, setCommentaire] = useState("");
  const [photo, setPhoto] = useState("");
  const [id_type_plat, setId_type_plat] = useState("");
  const [id_type_cuisson, setId_type_cuisson] = useState("");
  const [id_theme_plat, setId_theme_plat] = useState("");

  const [categorieList, setCategorieList] = useState([]);
  const [themeList, setThemeList] = useState([]);
  const [cookingList, setCookingList] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [recipeSubmitted, setRecipeSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("user", userId);
  }, [userId]);

  useEffect(() => {
    Axios.get("http://localhost:5000/api/getcategories").then((data) => {
      setCategorieList(data.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:5000/api/getthemes").then((data) => {
      setThemeList(data.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:5000/api/getcooking").then((data) => {
      setCookingList(data.data);
    });
  }, []);

  const submitRecipe = () => {
    console.log(libelle, commentaire, userId);
    Axios.post("http://localhost:5000/api/createrecipe", {
      libelle: libelle,
      nombre_portion: nombre_portion,
      type_portion: type_portion,
      temps_preparation: temps_preparation,
      temps_cuisson: temps_cuisson,
      temps_repos: temps_repos,
      difficulte: difficulte,
      cout: cout,
      commentaire: commentaire,
      photo: photo,
      id_type_plat: id_type_plat,
      id_type_cuisson: id_type_cuisson,
      id_theme_plat: id_theme_plat,
      userId: userId,
    }).then((response) => {
      console.log(response);
      const newRecipeId = response.data.id;
      navigate(`/ajouteringredients/${newRecipeId}`);
    //   setShowModal(true);
    //   setRecipeSubmitted(true);
    });
  };

  return (
    <>
      <Banner
        titre="Ajouter une recette"
        image={
          "https://cdn.pixabay.com/photo/2016/12/17/18/51/spices-1914130_1280.jpg"
        }
      />

      <Container
        style={{ position: "relative", minHeight: "100vh", fontSize: "15px" }}
      >
        <Row className="justify-content-center text-dark">
          <Col md={8} className="mt-5">
            <Row className="justify-content-start">
              <Col md={12}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nom de la recette"
                    onChange={(e) => {
                      setLibelle(e.target.value);
                    }}
                  />
                  <label>Nom de la recette</label>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-start">
              <Col md={6}>
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="0"
                    onChange={(e) => {
                      SetNombre_portion(e.target.value);
                    }}
                  />
                  <label>Nombre de portions</label>
                </div>
              </Col>
              <Col md={6}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    placeholder="Personnes, Unité, etc."
                    className="form-control"
                    onChange={(e) => {
                      setType_portion(e.target.value);
                    }}
                  />
                  <label>Type de portion</label>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-start">
              <Col md={4}>
                <div className="form-floating mb-3">
                  <input
                    type="time"
                    className="form-control"
                    onChange={(e) => {
                      setTemps_preparation(e.target.value);
                    }}
                  />
                  <label>Temps de préparation</label>
                </div>
              </Col>

              <Col md={4}>
                <div className="form-floating mb-3">
                  <input
                    type="time"
                    className="form-control"
                    onChange={(e) => {
                      setTemps_cuisson(e.target.value);
                    }}
                  />
                  <label>Temps de cuisson</label>
                </div>
              </Col>

              <Col md={4}>
                <div className="form-floating mb-3">
                  <input
                    type="time"
                    className="form-control"
                    onChange={(e) => {
                      setTemps_repos(e.target.value);
                    }}
                  />
                  <label>Temps de repos</label>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-start">
              <Col md={6}>
                <div className="form-floating mb-3">
                  <select
                    aria-label="Default select example"
                    className="form-control"
                    onChange={(e) => {
                      setDifficulte(e.target.value);
                    }}
                  >
                    <option>Niveau de difficulté</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                  <label>Difficulté</label>
                </div>
              </Col>
              <Col md={6}>
                <div className="form-floating mb-3">
                  <select
                    aria-label="Default select example"
                    className="form-control"
                    onChange={(e) => {
                      setCout(e.target.value);
                    }}
                  >
                    <option>Niveau de coût</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>{" "}
                  <label>Coût</label>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-start">
              <Col md={12}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Un court commentaire de votre recette"
                    onChange={(e) => {
                      setCommentaire(e.target.value);
                    }}
                  />
                  <label>Commentaire</label>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-start">
              <Col md={12}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Adresse URL de la photo"
                    onChange={(e) => {
                      setPhoto(e.target.value);
                    }}
                  />
                  <label>Photo</label>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-start">
              <Col md={4}>
                <div className="form-floating mb-3">
                  <select
                    aria-label="Default select example"
                    className="form-control"
                    onChange={(e) => {
                      setId_type_plat(e.target.value);
                    }}
                  >
                    <option>Sélectionner une catégorie</option>
                    {categorieList.map((val) => {
                      return (
                        <option key={val.id} value={val.id}>
                          {val.libelle}
                        </option>
                      );
                    })}
                  </select>
                  <label>Catégorie</label>
                </div>
              </Col>

              <Col md={4}>
                <div className="form-floating mb-3">
                  <select
                    aria-label="Default select example"
                    className="form-control"
                    onChange={(e) => {
                      setId_theme_plat(e.target.value);
                    }}
                  >
                    <option>Sélectionner un thème</option>
                    {themeList.map((val) => {
                      return (
                        <option key={val.id} value={val.id}>
                          {val.libelle}
                        </option>
                      );
                    })}
                  </select>{" "}
                  <label>Thème</label>
                </div>
              </Col>

              <Col md={4}>
                <div className="form-floating mb-3">
                  <select
                    aria-label="Default select example"
                    className="form-control"
                    onChange={(e) => {
                      setId_type_cuisson(e.target.value);
                    }}
                  >
                    <option>Sélectionner un type de cuisson</option>
                    {cookingList.map((val) => {
                      return (
                        <option key={val.id} value={val.id}>
                          {val.libelle}
                        </option>
                      );
                    })}
                  </select>{" "}
                  <label>Cuisson</label>
                </div>
              </Col>
            </Row>

            <Button variant="warning" type="submit" className="mb-3" onClick={submitRecipe}>
              Submit
            </Button>

          </Col>
        </Row>
      </Container>

      {/* {recipeSubmitted && (
  <Modal show={showModal} onHide={() => navigate(`/ajouteringredients/${newRecipeId}`)}>
    <Modal.Header closeButton>
      <Modal.Title>Recette enregistrée</Modal.Title>
    </Modal.Header>
    <Modal.Body>Votre recette a été créée avec succès !</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => navigate(`/ajouteringredients/${newRecipeId}`)}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>)} */}
    </>
  );
}

export default CreateRecette;
