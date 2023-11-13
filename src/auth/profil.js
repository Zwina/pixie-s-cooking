import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { AuthContext } from "../context/auth-context";
// import bcrypt from "bcrypt";
import { useAuth } from "../hook/auth-hook";
import Axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import Banner from "../components/banner";

function Profil(props) {
  const { token, login, logout, userId } = useAuth();
  const [user, setUser] = useState({});
  const [currentPassword, setCurrentPassword] = useState(""); // Nouvel état pour le mot de passe actuel
  const [newPassword, setNewPassword] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = (message) => {
    setErrorMessage(message);
    setShowModal(true);
  };

  useEffect(() => {
    if (userId) {
      Axios.get(`https://ill-puce-cricket-cape.cyclic.app/api/getuserbyid/${userId}`).then(
        (data) => {
          setUser({
            email: data.data[0].email,
            pseudo: data.data[0].pseudo,
            oldPassword: data.data[0].password,
          });
        }
      );
    }
  }, [userId]);

  const submitUser = () => {
    Axios.post(`https://ill-puce-cricket-cape.cyclic.app/api/modifyuser/${userId}`, {
      email: user.email,
      pseudo: user.pseudo,
      oldPassword: user.oldPassword,
      currentPassword: currentPassword,
      password: newPassword,
    })
      .then((response) => {
        console.log("Modification réussie", response.data);
        handleShowModal("Modification réussie");
        // Si la modification a réussi, vous pouvez effectuer des actions ici.
      })
      .catch((error) => {
        // console.error("Erreur lors de la modification :", error.response ? error.response.data : error.message);

        let errorMessage = "Une erreur s'est produite.";

        // Si une erreur s'est produite, essayez d'extraire le message d'erreur du texte brut.
        if (error.response && error.response.data) {
          const errorText = error.response.data.toString();
          const startIdx = errorText.indexOf("Error: ");
          const endIdx = errorText.indexOf("<br>");
          if (startIdx !== -1 && endIdx !== -1) {
            errorMessage = errorText.substring(startIdx + 7, endIdx).trim();
          }
        }

        // Affichez errorMessage dans la boîte de dialogue modale.
        handleShowModal(errorMessage);
      });
  };

  return (
    <>
      <Banner
        titre={"Profil"}
        image={
          "https://cdn.pixabay.com/photo/2016/12/17/18/51/spices-1914130_1280.jpg"
        }
      />

      <Container
        style={{ position: "relative", minHeight: "100vh", fontSize: "15px" }}
      >
        <h3 className="my-5">Mes informations</h3>
        {/* <p>{user.email}</p>
        <p>{user.pseudo}</p> */}

        <Row className="justify-content-center text-dark">
          <Col md={8} className="mt-3">
            <Row className="justify-content-start">
              <Col md={12}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value={user.email}
                    onChange={(e) => {
                      setUser({ ...user, email: e.target.value });
                    }}
                  />
                  <label>Email</label>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-start">
              <Col md={12}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Pseudo"
                    value={user.pseudo}
                    onChange={(e) => {
                      setUser({ ...user, pseudo: e.target.value });
                    }}
                  />
                  <label>Pseudo</label>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-start">
              <Col md={12}>
                <div className="form-floating mb-3">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className="form-control"
                    placeholder="Ancien mot de passe"
                    value={currentPassword}
                    onChange={(e) => {
                      setCurrentPassword(e.target.value);
                    }}
                  />
                  <span
                    className="password-toggle"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    ) : (
                      <FontAwesomeIcon icon={faEye} />
                    )}
                  </span>
                  <label>Mot de passe actuel</label>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-start">
              <Col md={12}>
                <div className="form-floating mb-3">
                  <input
                    type={newPasswordVisible ? "text" : "password"}
                    className="form-control"
                    placeholder="Nouveau mot de passe"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                  />
                  <span
                    className="password-toggle"
                    onClick={() => setNewPasswordVisible(!newPasswordVisible)}
                  >
                    {newPasswordVisible ? (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    ) : (
                      <FontAwesomeIcon icon={faEye} />
                    )}
                  </span>
                  <label>Nouveau mot de passe</label>
                </div>
              </Col>
            </Row>

            <Button
              variant="warning"
              type="submit"
              className="mb-3"
              onClick={submitUser}
            >
              Submit
            </Button>
          </Col>
        </Row>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Mes informations</Modal.Title>
          </Modal.Header>
          <Modal.Body>{errorMessage}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default Profil;
