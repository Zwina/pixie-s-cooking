import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Banner from "../components/banner";
import Button from "react-bootstrap/esm/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function UpdateEtapes() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({});
  const [steps, setSteps] = useState([]);
  const [libelle, setLibelle] = useState(1);
  const [commentaire, setCommentaire] = useState("");
  const [photo, setPhoto] = useState("");

  const [stepComments, setStepComments] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:5000/api/getrecipe/${id}`).then((data) => {
      setRecipe({
        id: id,
        libelle: data.data[0].libelle,
      });
    });
  }, []);

  useEffect(() => {
    Axios.get(`http://localhost:5000/api/getstepsbyrecipe/${id}`).then(
      (data) => {
        setSteps(data.data);

        // Mettez à jour l'état stepComments
        const comments = data.data.map((step) => ({
          id: step.idEtape,
          commentaire: step.commentaireEtape || "", // Utilisez le commentaire existant ou une chaîne vide
        }));
        setStepComments(comments);

        const maxLibelle = Math.max(
          ...data.data.map((step) => step.numeroEtape)
        );
        if (steps.length !== 0) {
          setLibelle(maxLibelle + 1);
        }
      }
    );
    // console.log("steps", steps);
  }, [steps]);

  const handleSubmit = () => {
    Axios.post("http://localhost:5000/api/createsteps", {
      libelle: libelle,
      commentaire: commentaire,
      photo: photo,
      id_recette: recipe.id,
    }).then((response) => {
      console.log(response);
      const newLibelle = libelle + 1;
      setLibelle(newLibelle);
      setCommentaire("");
      setPhoto("");
      navigate(`/modifieretapes/${recipe.id}`);
    });
  };

  const deleteEtape = (id) => {
    console.log("steps", steps);
    // Obtenez le numeroEtape de la step avec l'id correspondant
    const targetStepNumeroEtape = steps.find(
      (step) => step.idEtape === id
    ).numeroEtape;
    console.log("targetStepNumeroEtape", targetStepNumeroEtape);

    // Utilisez map pour mettre à jour les étapes éligibles
    const updatedStepNumbers = steps.map((step, index) => {
      if (step.numeroEtape > targetStepNumeroEtape) {
        return {
          id: step.idEtape,
          newNumber: index,
        };
      } else {
        return {
          id: step.idEtape,
          newNumber: step.numeroEtape,
        };
      }
    });

    console.log("updatedStepNumbers", updatedStepNumbers);
    Axios.post(`http://localhost:5000/api/deleteAndUpdateStep/${id}`, {
      updatedStepNumbers,
    })
      .then((response) => {
        alert("you deleted a step");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // const submitStep = (id, index) => {
  //   const updatedComment = stepComments[index].commentaire;
  //   Axios.post(`http://localhost:5000/api/modifystep/${id}`, {
  //     id: id,
  //     commentaire: updatedComment,
  //   }).then((response) => {
  //     console.log(response);
  //   });
  // };

  return (
    <>
      <Banner
        titre="Ajouter les étapes"
        image={
          "https://cdn.pixabay.com/photo/2016/12/17/18/51/spices-1914130_1280.jpg"
        }
      />

      <Container className="text-light my-4" style={{ position: "relative" }}>
        <h3
          className="text-light my-5"
          style={{ fontSize: "30px", textTransform: "uppercase" }}
        >
          préparation
        </h3>

        {steps.map((val, index) => {
          const handleDelete = () => {
            const confirmation = window.confirm(
              "Êtes-vous sûr de vouloir supprimer cette étape ?"
            );
            if (confirmation) {
              deleteEtape(val.idEtape);
            }
          };

          return (
            <Container key={val.idEtape}>
              <Row className="justify-content-center align-items-center mt-4">
                <Col xs={2} md={2}>
                  <div className="bg-numero-recipe ">
                    <p className="pt-1">{val.numeroEtape}</p>
                  </div>
                </Col>
                <Col xs={7} md={5}>
                  <h3
                    className="text-start"
                    style={{ fontSize: "25px", textTransform: "uppercase" }}
                  >
                    étape {val.numeroEtape}
                  </h3>
                </Col>
                <Col xs={1} md={1}>
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="p-2 text-danger text-end"
                    onClick={handleDelete}
                    style={{ cursor: "pointer" }}
                  />
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

        <Container style={{ position: "relative" }}>
          <Row className="my-4 justify-content-center">
            <Col xs={12} md={8} className="bg-dark py-2">
              <Row className="justify-content-center align-items-center my-4 ">
                <Col xs={2} md={2}>
                  <div className="bg-numero-recipe ">
                    <p className="pt-1">{libelle}</p>
                  </div>
                </Col>
                <Col xs={8} md={6}>
                  <h3
                    className="text-start"
                    style={{ fontSize: "25px", textTransform: "uppercase" }}
                  >
                    étape {libelle}
                  </h3>
                </Col>
              </Row>

              <Row
                className="justify-content-center text-dark"
                style={{ fontSize: "15px" }}
              >
                <Col md={10}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      value={commentaire}
                      placeholder="Un court commentaire de votre recette"
                      onChange={(e) => {
                        setCommentaire(e.target.value);
                      }}
                    />
                    <label>Déroulé de l'étape</label>
                  </div>
                </Col>
              </Row>

              <Button
                variant="warning"
                type="submit"
                className="my-2"
                onClick={handleSubmit}
              >
                Ajouter
              </Button>
            </Col>
          </Row>
        </Container>

        <Container
          className="my-5 py-3 "
          style={{ position: "relative", fontSize: "15px" }}
        >
          <p className="text-light">Retour à la recette</p>
          <Button variant="warning" href={`/recette/${recipe.id}`}>
            Retour
          </Button>
        </Container>

      </Container>
    </>
  );
}

export default UpdateEtapes;
