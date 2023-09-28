import React, { useState, useEffect } from "react";
import Banner from "../components/banner";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";
import Axios from "axios";
import { Link } from "react-router-dom";

function Themes() {
  const [themeList, setThemeList] = useState([]);

  useEffect(() => {
    Axios.get(`https://kind-tan-woodpecker-gear.cyclic.cloud/api/getthemes`).then((data) => {
      setThemeList(data.data);
    });
  }, []);

  return (
    <>
      <Banner
        titre="Les thèmes"
        image={
          "https://cdn.pixabay.com/photo/2016/12/17/18/51/spices-1914130_1280.jpg"
        }
      />
      <Container
        style={{ position: "relative", minHeight: "100vh" }}
        className="my-5"
      >
        <Row>
          {themeList.map((val) => {
            return (
              <Col
                lg={3}
                md={4}
                xs={6}
                key={val.id}
                className="mb-4 d-flex justify-content-center"
              >
                <Link
                  to={`/voirparthemes/${val.id}`}
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

export default Themes;
