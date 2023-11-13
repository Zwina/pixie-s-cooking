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

function CreateEtapes() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({});
  const [steps, setSteps] = useState([]);
  const [libelle, setLibelle] = useState(1);
  const [commentaire, setCommentaire] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    Axios.get(`https://ill-puce-cricket-cape.cyclic.app/api/getrecipe/${id}`).then((data) => {
      setRecipe({
        id: id,
        libelle: data.data[0].libelle,
      });
    });
  }, []);

  useEffect(() => {
    Axios.get(`https://ill-puce-cricket-cape.cyclic.app/api/getstepsbyrecipe/${id}`).then(
      (data) => {
        setSteps(data.data);
        const maxLibelle = Math.max(...data.data.map((step) => step.numeroEtape));
        if (steps.length !== 0) {
        setLibelle(maxLibelle + 1);
      }
      }
    );
    console.log("steps", steps);
  }, [steps]);

  const handleSubmit = () => {
    Axios.post("https://ill-puce-cricket-cape.cyclic.app/api/createsteps", {
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
      navigate(`/ajouteretapes/${recipe.id}`);
    });
  };
  

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

        {steps.map((val) => {
          return (
            <Container>
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

        <Container style={{ position: "relative", minHeight: "100vh" }}>

              <Row className="justify-content-center align-items-center my-4">
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
                <Col md={8}>
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
                className="mb-3"
                onClick={handleSubmit}
              >
                Ajouter
              </Button>

        </Container>
      </Container>
    </>
  );
}

export default CreateEtapes;
