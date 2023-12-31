import React, { useState, useEffect } from "react";
import CardRecette from "../components/cardRecette";
import Axios from "axios";
import Banner from "../components/banner";
import Container from "react-bootstrap/esm/Container";

function AllRecipes() {
  const [recipeList, setRecipeList] = useState([]);

  useEffect(() => {
    Axios.get(`https://ill-puce-cricket-cape.cyclic.app/api/getallrecipes`).then((data) => {
      setRecipeList(data.data);
    });
  }, []);

  return (
    <>
      <Banner
        titre="Toutes les recettes"
        image={
          "/home2.jpg"
        }
      />
      <Container style={{ position: "relative", minHeight: "100vh" }}>
        <CardRecette recipeList={recipeList} />
      </Container>
    </>
  );
}

export default AllRecipes;
