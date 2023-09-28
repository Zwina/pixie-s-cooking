import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardRecette from "../components/cardRecette";
import Axios from "axios";
import Banner from "../components/banner";
import Container from "react-bootstrap/esm/Container";

function SearchRecipe() {
  const [recipeList, setRecipeList] = useState([]);
  const { searchTerm } = useParams();
//   console.log(searchTerm);

  useEffect(() => {
    Axios.get(`https://kind-tan-woodpecker-gear.cyclic.cloud/api/search/${searchTerm}`).then((data) => {
      setRecipeList(data.data);
      console.log(recipeList);
    });
  }, [recipeList]);

  return (
    <>
      <Banner
        titre="Toutes les recettes"
        image={
          "/home2.jpg"
        }
      />
      <Container style={{ position: "relative", minHeight: "100vh" }}>
      {recipeList.length === 0 ? (
          <p className="m-5">Aucun résultat trouvé</p>
        ) : (
          <CardRecette recipeList={recipeList} />
        )}
      </Container>
    </>
  );
}

export default SearchRecipe;
