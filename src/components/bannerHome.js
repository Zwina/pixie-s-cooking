import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth-context";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function BannerHome(props) {
      const auth = useContext(AuthContext);
    const titre = props.titre;
    const image = props.image;

  return (
    <>
    <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
        className="banner"
      >
        <Image
          src={image}
          fluid
          className="mb-3"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          className="text-center shadow-lg rounded p-2 "
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -40%)",
          }}
        >
          <h1 className="text-white">{titre}</h1>
          <p>Bienvenue sur notre site de recettes en ligne !</p>
          <Button href={`/voirtout`} variant="outline-warning" className="my-4">Voir toutes les recettes</Button>
        </div>

        <div
          className="text-center p-2 px-5 "
          style={{
            position: "absolute",
            top: "50%",
            left: "75%",
            transform: "translate(-20%, -50%)",
          }}
        >
          <Image
          src="/rabbit-icon2.webp"
          fluid
          className="mb-3"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        </div>
        {!auth.isLoggedIn && (
          <div
          className="text-center p-2 px-5"
          style={{
            position: "absolute",
            top: "20%",
            left: "90%",
            transform: "translate(-50%, -50%)",
          }}
        >
            <Button
              style={{ fontSize: "12px" }}
              variant="warning"
              className="mx-1"
              href="/login"
            >
              Connexion
            </Button>
        </div>
         )}

        {auth.isLoggedIn && (
          <div
            className="text-center p-2 px-5"
            style={{
              position: "absolute",
              top: "20%",
              left: "90%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Link to={`/profil`}>
              <FontAwesomeIcon
                icon={faUser}
                className="w-12 h-12 bg-light text-dark p-2 rounded-5 border border-warning border-2"
              />
              <Button
                style={{ fontSize: "12px" }}
                variant="warning"
                className="mx-1"
                onClick={auth.logout}
              >
                Déconnexion
              </Button>
            </Link>
          </div>
        )}

      </div>
    </>
  );
}

export default BannerHome;
