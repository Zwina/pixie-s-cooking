import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardRecette from "../components/cardRecette";
import Banner from "../components/banner";
import Container from "react-bootstrap/esm/Container";
import Axios from "axios";

function RecipesByCategories() {
  const { id } = useParams();
  const [recipeList, setRecipeList] = useState([]);
  const [categorie, setCategorie] = useState({});

  useEffect(() => {
    Axios.get(`https://ill-puce-cricket-cape.cyclic.app/api/getrecipesbycategorie/${id}`).then(
      (data) => {
        setRecipeList(data.data);
        console.log(recipeList)
      }
    );
  }, []);

  useEffect(() => {
    Axios.get(`https://ill-puce-cricket-cape.cyclic.app/api/getcategorie/${id}`).then(
      (data) => {
        setCategorie({
          name: data.data[0].libelle
        });
      }
    );
  }, []);

  return (
    <>
    <Banner
        titre={categorie.name}
        image={
          "https://cdn.pixabay.com/photo/2016/12/17/18/51/spices-1914130_1280.jpg"
        }
      />
      <Container style={{ position: "relative", minHeight: "100vh" }}>
      <CardRecette recipeList={recipeList} />
      </Container>
    </>
  );
}

export default RecipesByCategories;
