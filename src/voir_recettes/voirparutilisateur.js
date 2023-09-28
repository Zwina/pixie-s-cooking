import React, { useState, useEffect } from "react";
import jwt_decode  from 'jwt-decode' // import dependency
import { useAuth } from "../hook/auth-hook";
import { useParams } from "react-router-dom";
import CardRecette from "../components/cardRecette";
import Banner from "../components/banner";
import Container from "react-bootstrap/esm/Container";
import Axios from "axios";

function MyRecipes() {
    const [decodedUserId, setDecodedUserId] = useState(null); // Initialize with null or appropriate initial value
  
    const { token, login, logout, userId } = useAuth();
    console.log("tokenS", token);
    console.log("Received token:", token);


  const [recipeList, setRecipeList] = useState([]);
  const [categorie, setCategorie] = useState({});

  useEffect(() => {
    try {
      const decodedToken = jwt_decode(token);
      console.log("Decoded token:", decodedToken);
      setDecodedUserId(decodedToken.userId);
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }, [token]); // Run this effect whenever the token changes


  useEffect(() => {
    if (decodedUserId) {
      Axios.get(`http://localhost:5000/api/getmyrecipes/${decodedUserId}`).then(
        (data) => {
            setRecipeList(data.data);
            console.log(recipeList)
        }
      );
    }
  }, [decodedUserId]);


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

export default MyRecipes;
