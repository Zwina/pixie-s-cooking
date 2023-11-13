import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../hook/auth-hook";
import Banner from "../components/banner";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/Card";
import Axios from "axios";
import Image from "react-bootstrap/esm/Image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/esm/Button";

function RecipeDetails() {
  const { token, login, logout, userId } = useAuth();
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);

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
        type_plat: data.data[0].type_plat,
        cuisson: data.data[0].cuisson,
        theme_plat: data.data[0].theme_plat,
        id_user: data.data[0].id_user,
        temps_preparation:
          +data.data[0].temps_preparation.split(":")[0] * 60 +
          +data.data[0].temps_preparation.split(":")[1],
        temps_cuisson:
          +data.data[0].temps_cuisson.split(":")[0] * 60 +
          +data.data[0].temps_cuisson.split(":")[1],
        temps_repos:
          +data.data[0].temps_repos.split(":")[0] * 60 +
          +data.data[0].temps_repos.split(":")[1],
      });
    });
  }, []);

  useEffect(() => {
    Axios.get(`https://ill-puce-cricket-cape.cyclic.app/api/getingredientsbyrecipe/${id}`).then(
      (data) => {
        setIngredients(data.data);
      }
    );
    // console.log("ingredients", ingredients);
  }, [id]);

  useEffect(() => {
    Axios.get(`https://ill-puce-cricket-cape.cyclic.app/api/getstepsbyrecipe/${id}`).then(
      (data) => {
        setSteps(data.data);
      }
    );
    console.log("steps", steps);
  }, [id]);

  return (
    <>
      <Banner
        titre="Les recettes"
        image={
          "https://cdn.pixabay.com/photo/2016/12/17/18/51/spices-1914130_1280.jpg"
        }
      />
      <Container style={{ position: "relative" }}>
        <Row className="justify-content-center">
          <Col md={2} xs={4} className="mt-5">
            <Button variant="outline-warning">{recipe.type_plat}</Button>
          </Col>
          <Col md={3} xs={4} className="mt-5">
            <Button variant="outline-warning">{recipe.theme_plat}</Button>
          </Col>
          <Col md={2} xs={4} className="mt-5">
            <Button variant="outline-warning">
              Cuisson : {recipe.cuisson}
            </Button>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={8} className="mt-5">
            {userId === recipe.id_user && (
              <div className="d-flex justify-content-end">
                <Button variant="warning" href={`/modifierrecette/${id}`} className="mb-4">Modifier les détails</Button>
              </div>
            )}
            <h2>{recipe.name}</h2>
          </Col>
        </Row>

        <Row className="justify-content-center mt-3">
          <Col md={8}>
            <Image
              src={recipe.photo}
              className="mt-3  rounded-3"
              style={{ width: "100%", maxHeight: "490px", objectFit: "cover" }}
            />
          </Col>
        </Row>
        <Row className="justify-content-center mt-4">
          <Col md={8}>
            <h5>"{recipe.commentaire}"</h5>
            <hr></hr>
          </Col>
        </Row>
        <Row className="justify-content-center my-4">
          <Col md={4} className="mt-4">
            <h3
              className="text-light"
              style={{ fontSize: "20px", textTransform: "uppercase" }}
            >
              <FontAwesomeIcon
                icon={faCircleInfo}
                className="text-warning px-1"
              />{" "}
              Détails
            </h3>
            <Row className="justify-content-center">
              <Col xs={3}>
                <div className="bg-item-recipe mx-auto mt-2">
                  <p className="pt-1">{recipe.difficulte}</p>
                </div>
                <p className="text-secondary" style={{ fontSize: "15px" }}>
                  Difficulté
                </p>
              </Col>
              <Col xs={3}>
                <div className="bg-item-recipe mx-auto mt-2">
                  <p className="pt-1">{recipe.cout}</p>
                </div>
                <p className="text-secondary" style={{ fontSize: "15px" }}>
                  Coût
                </p>
              </Col>
            </Row>
          </Col>
          <Col md={4} className="mt-4">
            <h3
              className="text-light"
              style={{ fontSize: "20px", textTransform: "uppercase" }}
            >
              <FontAwesomeIcon
                icon={faClock}
                className="text-warning px-1"
              />{" "}
              Durée
            </h3>
            <Row>
              <Col xs={4}>
                <div className="bg-item-recipe mx-auto mt-2">
                  <p className="pt-1">{recipe.temps_preparation}'</p>
                </div>
                <p className="text-secondary" style={{ fontSize: "15px" }}>
                  Préparation
                </p>
              </Col>
              <Col xs={4}>
                <div className="bg-item-recipe mx-auto mt-2">
                  <p className="pt-1">{recipe.temps_cuisson}'</p>
                </div>
                <p className="text-secondary" style={{ fontSize: "15px" }}>
                  Cuisson
                </p>
              </Col>
              <Col xs={4}>
                <div className="bg-item-recipe mx-auto mt-2">
                  <p className="pt-1">{recipe.temps_repos}'</p>
                </div>
                <p className="text-secondary" style={{ fontSize: "15px" }}>
                  Repos
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Container style={{ position: "relative" }}>
        <Row className="my-4 justify-content-center">
          <Col md={8} className="bg-dark">
          {userId === recipe.id_user && (
              <div className="d-flex justify-content-end mt-4">
                <Button variant="warning" href={`/modifieringredients/${id}`}>Modifier les ingrédients</Button>
              </div>
            )}
            <h3
              className="text-light my-4"
              style={{ fontSize: "30px", textTransform: "uppercase" }}
            >
              Ingrédients
            </h3>
            <Row className="my-4 justify-content-center">
              {ingredients.map((val) => {
                return (
                  <Col xs={6} md={4} xl={3} key={val.id} className="px-4">
                    <Card
                      text="light"
                      className="justify-content-center mb-4 border"
                      style={{ background: "#212529", height: "90px" }}
                    >
                      <Row className="align-items-center">
                        <Col xs={3} className="bg-ingredient-recipe mx-auto">
                          <Image
                            src={val.icon}
                            className="pt-1"
                            style={{ width: "100%", height: "auto" }}
                          />
                        </Col>
                        <Col xs={9}>
                          <Card.Text style={{ fontSize: "15px" }}>
                            {val.quantite} {val.unite} {val.ingredient}
                          </Card.Text>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Container>
      <Container
        className="text-light my-4"
        style={{ position: "relative", minHeight: "100vh" }}
      >
        <Row className="justify-content-center">
          <Col md={8} className="my-2">
            {userId === recipe.id_user && (
              <div className="d-flex justify-content-end">
                <Button variant="warning"  href={`/modifieretapes/${id}`}>Modifier les étapes</Button>
              </div>
            )}
            <h3
          className="text-light my-4"
          style={{ fontSize: "30px", textTransform: "uppercase" }}
        >
          préparation
        </h3>
          </Col>
        </Row>

        {steps.map((val) => {
          return (
            <Container key={val.id}>
              <Row className="justify-content-center align-items-center mt-4">
                <Col xs={2} md={2}>
                  <div className="bg-numero-recipe ">
                    <p className="pt-1">{val.numeroEtape}</p>
                  </div>
                </Col>
                <Col xs={8} md={6}>
                  <h3
                    className="text-start"
                    style={{ fontSize: "25px", textTransform: "uppercase" }}
                  >
                    étape {val.numeroEtape}
                  </h3>
                </Col>
              </Row>

              <Row className="justify-content-center align-items-center mt-4">
                <Col md={8}>
                  <p className="text-start mb-5">{val.commentaireEtape}</p>
                </Col>
              </Row>
            </Container>
          );
        })}
      </Container>
    </>
  );
}

export default RecipeDetails;
