import React, { useState, useEffect } from "react";
import Axios from "axios";
import Container from "react-bootstrap/esm/Container";
import BannerHome from "./components/bannerHome";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/esm/Image";
import Button from "react-bootstrap/esm/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faUtensils } from "@fortawesome/free-solid-svg-icons";

function MainPage() {
  const [recipeList, setRecipeList] = useState([]);
  const [recipeTopList, setRecipeTopList] = useState([]);

  useEffect(() => {
    Axios.get(`https://kind-tan-woodpecker-gear.cyclic.cloud/api/getrandomrecipes`).then((data) => {
      setRecipeList(data.data);
      // console.log(recipeList);
    });
  }, []);

  useEffect(() => {
    Axios.get(`https://kind-tan-woodpecker-gear.cyclic.cloud/api/gettoprecipes`).then((data) => {
      setRecipeTopList(data.data);
      console.log(recipeTopList);
    });
  }, []);

  return (
    <>
      <BannerHome titre="Pixie's Cooking" image={"/home2.jpg"} />
      <Container
        className="my-5"
        style={{ position: "relative", minHeight: "100vh" }}
      >
        <h3
          style={{ textTransform: "uppercase" }}
          className="mx-5 pb-3 border-bottom border-3"
        >
          Recettes à la une
        </h3>

        {recipeList.map((val) => {
          return (
            <Row className="d-flex justify-content-center my-5" key={val.id}>
              <Col md={5}>
                <Image
                  src={val.photo}
                  fluid
                  className="mb-3"
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                  }}
                />
              </Col>

              <Col md={4}>
                <h4 className="mx-5 pb-3 border-bottom mt-2">{val.libelle}</h4>
                <h6>"{val.commentaire}"</h6>
                <Row className="d-flex justify-content-center mx-4">
                  <Col xs={4} className="my-3">
                    <h3
                      className="text-light"
                      style={{ fontSize: "20px", textTransform: "uppercase" }}
                    >
                      <FontAwesomeIcon
                        icon={faCoins}
                        size="md"
                        className="text-warning px-1"
                      />{" "}
                      {val.cout}
                    </h3>
                  </Col>
                  <Col xs={4} className="my-3">
                    <h3
                      className="text-light"
                      style={{ fontSize: "20px", textTransform: "uppercase" }}
                    >
                      <FontAwesomeIcon
                        icon={faUtensils}
                        size="md"
                        className="text-warning px-1"
                      />{" "}
                      {val.difficulte}
                    </h3>
                  </Col>
                </Row>

                <Button href={`/recette/${val.id}`} variant="outline-warning">
                  Voir la recette
                </Button>
              </Col>
            </Row>
          );
        })}
      </Container>

      <Container
        className="my-5"
        style={{ position: "relative", minHeight: "100vh" }}
      >
        <h3
          style={{ textTransform: "uppercase" }}
          className="mx-5 pb-3 border-bottom border-3"
        >
          Top recettes
        </h3>
        <Row className="d-flex justify-content-center my-5">
          {recipeTopList.map((val, index) => {
            return (
              <Col xs={6} md={2} key={val.id}>
                <div className="text-center mb-2">
                  <h3 className="text-warning p-2">{index + 1}</h3>
                </div>
                <Image
                  src={val.photo}
                  fluid
                  className="mb-3"
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                  }}
                />
                <h6 className="my-2">{val.libelle}</h6>
                <Button href={`/recette/${val.id}`} variant="outline-warning" className="mt-2">
                  Voir la recette
                </Button>
              </Col>
            );
          })}
        </Row>
      </Container>

      <Container
        className="mb-5"
        style={{ position: "relative", minHeight: "100vh" }}
      >
        <h3
          style={{ textTransform: "uppercase" }}
          className="mx-5 pb-3 border-bottom border-3"
        >
          Astuces cuisine
        </h3>
        <Row className="d-flex justify-content-center my-5">
            <Col md={4}>
            <Image
                  src="/home1.jpg"
                  fluid
                  className="mb-3"
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                  }}
                />
                <h6 className="my-2">Article 1</h6>
            </Col>

            <Col md={4}>
            <Image
                  src="/home1.jpg"
                  fluid
                  className="mb-3"
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                  }}
                />
                <h6 className="my-2">Article 2</h6>
            </Col>

            <Col md={4}>
            <Image
                  src="/home1.jpg"
                  fluid
                  className="mb-3"
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                  }}
                />
                <h6 className="my-2">Article 3</h6>
            </Col>
        </Row>
      </Container>
    </>
  );
}

export default MainPage;
