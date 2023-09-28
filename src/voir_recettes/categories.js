import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardRecette from "../components/cardRecette";
import Banner from "../components/banner";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import Axios from "axios";
import { Link } from "react-router-dom";

function Categories() {
  const [categorieList, setCategorieList] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:5000/api/getcategories`).then((data) => {
      setCategorieList(data.data);
    });
  }, []);

  return (
    <>
      <Banner
        titre="Les catégories"
        image={
          "https://cdn.pixabay.com/photo/2016/12/17/18/51/spices-1914130_1280.jpg"
        }
      />
      <Container
        style={{ position: "relative", minHeight: "100vh" }}
        className="m-5"
      >
        <Row>
          {categorieList.map((val) => {
            return (
              <Col
                lg={3}
                md={4}
                xs={6}
                key={val.id}
                className="mb-4 d-flex justify-content-center"
              >
                <Link
                  to={`/voirparcategories/${val.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card bg="dark" text="light" style={{ width: "200px" }}>
                    <Card.Img
                      variant="top"
                      src={val.icon}
                      alt="Card Img"
                      style={{ height: "100px", objectFit: "cover" }}
                    />
                    <Card.Body>
                      <Card.Title style={{ fontSize: "16px" }}>
                        {val.libelle}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default Categories;
