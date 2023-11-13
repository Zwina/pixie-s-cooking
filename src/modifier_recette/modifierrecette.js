import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuth } from "../hook/auth-hook";
import "../App.css";
import Banner from "../components/banner";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Modal from "react-bootstrap/Modal";

import Container from "react-bootstrap/Container";

function UpdateRecette() {
  const { token, login, logout, userId } = useAuth();
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});

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
    Axios.get(`https://ill-puce-cricket-cape.cyclic.app/api/getrecipe/${id}`).then((data) => {
      setRecipe({
        name: data.data[0].libelle,
        difficulte: data.data[0].difficulte,
        cout: data.data[0].cout,
        photo: data.data[0].photo,
        commentaire: data.data[0].commentaire,
        nombre_portion: data.data[0].nombre_portion,
        type_portion: data.data[0].type_portion,
        id_type_plat: data.data[0].id_type_plat,
        type_plat: data.data[0].type_plat,
        cuisson: data.data[0].cuisson,
        id_type_cuisson: data.data[0].id_type_cuisson,
        theme_plat: data.data[0].theme_plat,
        id_theme_plat: data.data[0].id_theme_plat,
        id_user: data.data[0].id_user,
        temps_preparation: data.data[0].temps_preparation,
        temps_cuisson: data.data[0].temps_cuisson,
        temps_repos: data.data[0].temps_repos,
      });
    });
  }, []);

  useEffect(() => {
    Axios.get("https://ill-puce-cricket-cape.cyclic.app/api/getcategories").then((data) => {
      setCategorieList(data.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("https://ill-puce-cricket-cape.cyclic.app/api/getthemes").then((data) => {
      setThemeList(data.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("https://ill-puce-cricket-cape.cyclic.app/api/getcooking").then((data) => {
      setCookingList(data.data);
    });
  }, []);

  const submitRecipe = () => {
    console.log(userId, recipe.name, recipe.difficulte, recipe.cout);
    Axios.post(`https://ill-puce-cricket-cape.cyclic.app/api/modifyrecipe/${id}`, {
      libelle: recipe.name,
      nombre_portion: recipe.nombre_portion,
      type_portion: recipe.type_portion,
      temps_preparation: recipe.temps_preparation,
      temps_cuisson: recipe.temps_cuisson,
      temps_repos: recipe.temps_repos,
      difficulte: recipe.difficulte,
      cout: recipe.cout,
      commentaire: recipe.commentaire,
      photo: recipe.photo,
      id_type_plat: recipe.id_type_plat,
      id_type_cuisson: recipe.id_type_cuisson,
      id_theme_plat: recipe.id_theme_plat,
      userId: userId,
    }).then((response) => {
      console.log(response);
      navigate(`/recette/${id}`);
      //   setShowModal(true);
      //   setRecipeSubmitted(true);
    });
  };

  return (
    <>
      <Banner
        titre="Modifier une recette"
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
                    value={recipe.name}
                    onChange={(e) => {
                      setRecipe({ ...recipe, name: e.target.value });
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
                    value={recipe.nombre_portion}
                    onChange={(e) => {
                        setRecipe({ ...recipe, nombre_portion: e.target.value });
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
                    value={recipe.type_portion}
                    onChange={(e) => {
                        setRecipe({ ...recipe, type_portion: e.target.value });
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
                    value={recipe.temps_preparation}
                    onChange={(e) => {
                        setRecipe({ ...recipe, temps_preparation: e.target.value });
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
                    value={recipe.temps_cuisson}
                    onChange={(e) => {
                        setRecipe({ ...recipe, temps_cuisson: e.target.value });
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
                    value={recipe.temps_repos}
                    onChange={(e) => {
                        setRecipe({ ...recipe, temps_repos: e.target.value });
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
                        setRecipe({ ...recipe, difficulte: e.target.value });
                    }}
                  >
                    <option value={recipe.difficulte}>{recipe.difficulte}</option>
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
                        setRecipe({ ...recipe, cout: e.target.value });
                    }}
                  >
                    <option value={recipe.cout}>{recipe.cout}</option>
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
                    value={recipe.commentaire}
                    onChange={(e) => {
                        setRecipe({ ...recipe, commentaire: e.target.value });
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
                    value={recipe.photo}
                    onChange={(e) => {
                        setRecipe({ ...recipe, photo: e.target.value });
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
                        setRecipe({ ...recipe, id_type_plat: e.target.value });
                    }}
                  >
                    <option value={recipe.id_type_plat}>{recipe.type_plat}</option>
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
                        setRecipe({ ...recipe, id_theme_plat: e.target.value });
                      }}
                    >
                      <option value={recipe.id_theme_plat}>{recipe.theme_plat}</option>
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
                        setRecipe({ ...recipe, id_type_cuisson: e.target.value });
                      }}
                    >
                      <option value={recipe.id_type_cuisson}>{recipe.cuisson}</option>
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

            <Button
              variant="warning"
              type="submit"
              className="mb-3"
              onClick={submitRecipe}
            >
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

export default UpdateRecette;
