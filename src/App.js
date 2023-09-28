import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import AuthContext from "./context/auth-context";
import { useAuth } from "./hook/auth-hook";

import "./App.css";

import LoginPage from "./auth/Login";
import SignupPage from "./auth/signup";
import MainPage from "./Home";
import NavScroll from "./components/nav";
import AllRecipes from "./voir_recettes/voirtout";
import RecipesByCategories from "./voir_recettes/voirparcategories";
import RecipesByTheme from "./voir_recettes/voirpartheme";
import RecipeDetails from "./voir_recettes/voirdetail";
import CreateRecette from "./ajouter_recette/ajouterrecette";
import CreateIngredients from "./ajouter_recette/ajouteringredients";
import CreateEtapes from "./ajouter_recette/ajouteretapes";
import MyRecipes from "./voir_recettes/voirparutilisateur";
import UpdateRecette from "./modifier_recette/modifierrecette";
import UpdateIngredients from "./modifier_recette/modifieringredients";
import UpdateEtapes from "./modifier_recette/modifieretapes";
import Profil from "./auth/profil";
import Categories from "./voir_recettes/categories";
import Themes from "./voir_recettes/themes";
import SearchBox from "./components/searchBox";
import SearchRecipe from "./voir_recettes/recherche";

function App() {
  const { token, login, logout, userId } = useAuth();
  console.log("token", token);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <><Router>
      <NavScroll/>
        <div className="App">
        <header className="App-header">
          
          
            <Routes>
              <Route exact path="/" element={<MainPage />} />

              <Route path="/voirtout" element={<AllRecipes />} />

              <Route path="/voirparcategories" element={<Categories />} />

              <Route path="/voirparcategories/:id" element={<RecipesByCategories />} />

              <Route path="/voirparthemes" element={<Themes />} />

              <Route path="/voirpartheme/:id" element={<RecipesByTheme />} />

              <Route path="/recette/:id" element={<RecipeDetails />} />

              <Route path="/ajouterrecette" element={<CreateRecette />} />

              <Route path="/ajouteringredients/:id" element={<CreateIngredients />} />

              <Route path="/ajouteretapes/:id" element={<CreateEtapes />} />

              <Route path="/modifierrecette/:id" element={<UpdateRecette />} />
              <Route path="/modifieringredients/:id" element={<UpdateIngredients />} />
              <Route path="/modifieretapes/:id" element={<UpdateEtapes />} />

              {!token && <Route path="/login" element={<LoginPage />} exact />}
              {token && (<Route path="/login" element={<Navigate to="/" replace />} />)}
 
              {!token && (<Route path="/signup" element={<SignupPage />} exact />)}
              {token && (<Route path="/signup" element={<Navigate to="/" replace />} />)}

              {!token && <Route path="/profil" element={<MainPage />} exact />}
              {token && <Route path="/profil" element={<Profil />} replace />}


              {!token && <Route path="/mesrecettes" element={<MainPage />} exact />}
              {token && <Route path="/mesrecettes" element={<MyRecipes />} replace />}

              <Route path="/recherche/:searchTerm" element={<SearchRecipe />} />
{/*
              {!token && <Route path="/profil" element={<MainPage />} exact />}
              {token && <Route path="/profil" element={<Profil />} replace />}

              {!token && <Route path="/voyage/mesvoyages" element={<MainPage />} exact />}
              {token && <Route path="/voyage/mesvoyages" element={<MesVoyages />} replace />}

              {!token && <Route path="/voyage/favoris" element={<MainPage />} exact />}
              {token && <Route path="/voyage/favoris" element={<MesVoyagesFavoris />} replace />}
*/}
            </Routes>
          
          </header>
        </div>
</Router>
      </>
    </AuthContext.Provider>
  );
}

export default App;



// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>

//     </div>
//   );
// }

// export default App;
