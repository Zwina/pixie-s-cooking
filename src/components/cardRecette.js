import { AuthContext } from "../context/auth-context";
import { useAuth } from "../hook/auth-hook";
import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/esm/Row";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faCrown } from "@fortawesome/free-solid-svg-icons";

function CardRecette(props) {
  const { token, login, logout, userId } = useAuth();
  const auth = useContext(AuthContext);
  let recipeList = props.recipeList;

  useEffect(() => {
    console.log("user", userId);
  }, [userId]);

  const LikeRecipe = (id) => {
    Axios.post(`http://localhost:5000/api/like/${id}`).then((response) => {
      alert("you liked a recipe");
    });
  };

  return (
    <>
      <Container className="my-5">
        <Row >
          {recipeList.map((val) => {
            return (
              <Col
                lg={3}
                md={4}
                key={val.id}
                className="mb-4 d-flex justify-content-center"
              >
                <Card bg="dark" text="light" className="w-100 text-center">

                  <div
                    className="text-center p-1"
                    style={{
                      position: "absolute",
                      top: "10%",
                      left: "20%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {auth.isLoggedIn && userId === val.id_user && (
                        <FontAwesomeIcon
                          icon={faCrown}
                          className="w-4 h-4 text-light p-2 pe-4"
                        />
                      )} 
                  </div>

                  <Card.Img
                    variant="top"
                    src={val.photo}
                    alt="Card Img"
                    style={{ height: "200px", width:"auto", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{val.libelle}</Card.Title>

                    <Row className="mt-4 d-flex justify-content-center align-items-center">
                      <Col xs={6} style={{fontSize: "15px"}}>
                        <Button
                          href={`/recette/${val.id}`}
                          variant="outline-warning"
                        >
                          Détails
                        </Button>
                      </Col>

                      <Col xs={6} style={{fontSize: "15px"}} className="text-warning">
                          <FontAwesomeIcon
                            icon={faThumbsUp}
                            className="w-6 h-6"
                            style={{fontSize: "15px", cursor: "pointer"}}
                            onClick={() => LikeRecipe(val.id)}
                          />{" "}
                          {val.likes}
                      </Col>
                    </Row>

                    {/* <Button
                      href={`/recette/${val.id}`}
                      variant="outline-warning"
                    >
                      Détails
                    </Button> */}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default CardRecette;
