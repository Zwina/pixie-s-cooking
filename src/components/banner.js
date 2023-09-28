import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth-context";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/esm/Button";

function Banner(props) {
  const auth = useContext(AuthContext);

  const titre = props.titre;
  const image = props.image;

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "200px",
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
          className="text-center shadow-lg rounded p-2 px-5"
          style={{
            position: "absolute",
            top: "60%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <h1 className="text-white">{titre}</h1>
        </div>

        {!auth.isLoggedIn && (
          <div
          className="text-center p-2 px-5"
          style={{
            position: "absolute",
            top: "60%",
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
              top: "60%",
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

export default Banner;
