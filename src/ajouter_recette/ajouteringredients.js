import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Banner from "../components/banner";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/esm/Image";
import Button from "react-bootstrap/esm/Button";

function CreateIngredients() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [ingredientList, setIngredientList] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [quantite, setQuantite] = useState("");
  const [unite, setUnite] = useState("");

  const [createdIngredientLibelle, setCreatedIngredientLibelle] = useState("");
  const [createdIngredientIcon, setCreatedIngredientIcon] = useState("");

  useEffect(() => {
    Axios.get(`https://kind-tan-woodpecker-gear.cyclic.cloud/api/getrecipe/${id}`).then((data) => {
      setRecipe({
        id: id,
        libelle: data.data[0].libelle,
      });
    });
  }, []);

  useEffect(() => {
    Axios.get(`https://kind-tan-woodpecker-gear.cyclic.cloud/api/getingredientsbyrecipe/${id}`).then(
      (data) => {
        setIngredients(data.data);
      }
    );
    // console.log("ingredients", ingredients);
  }, [ingredients]);

  useEffect(() => {
    Axios.get("https://kind-tan-woodpecker-gear.cyclic.cloud/api/getingredients").then((data) => {
      setIngredientList(data.data);
    });
  }, [ingredientList]);

  const handleSubmit = () => {
    Axios.post("https://kind-tan-woodpecker-gear.cyclic.cloud/api/createingredient", {
      id_ingredient: selectedIngredient,
      quantite: quantite,
      unite: unite,
      id_recette: recipe.id,
    }).then((response) => {
      console.log(response);
      setSelectedIngredient("");
    setQuantite("");
    setUnite("");
      navigate(`/ajouteringredients/${recipe.id}`);
    });
    console.log(`Selected Ingredient: ${selectedIngredient}`);
    console.log(`Quantity: ${quantite}`);
    console.log(`Unit: ${unite}`);
  };

  const submitIngredient = () => {
    Axios.post("https://kind-tan-woodpecker-gear.cyclic.cloud/api/addingredient", {
      libelle: createdIngredientLibelle,
      icon: createdIngredientIcon,
    }).then((response) => {
      console.log(response);
      setCreatedIngredientLibelle("");
      setCreatedIngredientIcon("");
      navigate(`/ajouteringredients/${recipe.id}`);
    });
  };


  return (
    <>
      <Banner
        titre="Ajouter les ingrédients"
        image={
          "https://cdn.pixabay.com/photo/2016/12/17/18/51/spices-1914130_1280.jpg"
        }
      />
      <Container style={{ position: "relative" }}>
        <Row className="my-4 justify-content-center">
          <Col md={8} className="bg-dark">
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
        className="text-dark "
        style={{ position: "relative", fontSize: "15px" }}
      >
        <Row className="justify-content-center">
          <Col md={8} className="bg-dark py-3">
            <Row>
              <Col md={3}>
                <div className="form-floating mb-3">
                  <select
                    className="form-control"
                    value={selectedIngredient}
                    onChange={(e) => setSelectedIngredient(e.target.value)}
                  >
                    <option value=""></option>
                    {ingredientList.map((ingredient) => (
                      <option key={ingredient.id} value={ingredient.id}>
                        {ingredient.libelle}
                      </option>
                    ))}
                  </select>
                  <label>Nom de l'ingrédient</label>
                </div>
              </Col>
              <Col md={3}>
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    value={quantite}
                    onChange={(e) => setQuantite(e.target.value)}
                  />
                  <label>Quantité</label>
                </div>
              </Col>
              <Col md={3}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    value={unite}
                    onChange={(e) => setUnite(e.target.value)}
                  />
                  <label>Unité</label>
                </div>
              </Col>
              <Col md={2}>
                <Button variant="warning" onClick={handleSubmit}>
                  Ajouter
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <Container
        className="text-dark mt-4 mb-4"
        style={{ position: "relative", fontSize: "15px" }}
      >
        <Row className="justify-content-center">
          <Col md={8} className="bg-dark py-3">
            <p className="text-light">Votre ingrédient n'est pas encore dans la liste? Ajoutez-le !</p>
            <Row className="justify-content-center">
              <Col md={5}>
                <div className="form-floating mb-3">
                <input
                    type="text"
                    value={createdIngredientLibelle}
                    className="form-control"
                    onChange={(e) => setCreatedIngredientLibelle(e.target.value)}
                  />
                  <label>Nom de l'ingrédient</label>
                </div>
              </Col>
              <Col md={5}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    value={createdIngredientIcon}
                    className="form-control"
                    onChange={(e) => setCreatedIngredientIcon(e.target.value)}
                  />
                  <label>Url de l'icone</label>
                </div>
              </Col>
              <Col md={2}>
                <Button variant="warning" onClick={submitIngredient}>
                  Créer
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <Container
        className="mt-4 mb-4"
        style={{ position: "relative", fontSize: "15px" }}
      >
        <p className="text-light">Vous avez ajouté tous vos ingrédients? Passez aux étapes!</p>
            <Button variant="warning" href={`/ajouteretapes/${recipe.id}`}>
                  Suivant
                </Button>

      </Container>
    </>
  );
}

export default CreateIngredients;
