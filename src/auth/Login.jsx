import React, { useState, useContext } from "react";
// import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

const Login = (props) => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [httpErrors, setHttpErrors] = useState();
  //   const history = useHistory();
  // console.log(oeuvreId);

  //   const switchModeHandler = () => {
  //     setIsLoginMode(isLoginMode ? "false" : "true" );
  //     }

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    async function authUser() {
      try {
        const response = await fetch(
          //   process.env.REACT_APP_BACKEND_URL + `/users/login`, {
          "https://ill-puce-cricket-cape.cyclic.app/api/signin",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: form.email,
              password: form.password,
            }),
          }
        );
        const responseData = await response.json();
        if (!response.ok) {
          // console.log("throw : " + responseData.message);
          throw new Error(responseData.message);
        }
        // console.log("responseData", responseData);
        auth.login(responseData.userId, responseData.token);
      } catch (err) {
        console.log(err.message);
        setHttpErrors("Email ou mot de passe incorrect");
      }
    }
    authUser();
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    // setForm((prevForm) => ({
    //   ...prevForm,
    //   [e.target.name]: e.target.value,
    // }));

    setFormIsValid(handleValidation(e.target.name, e.target.value));
    // console.log("formIsValid", typeof (formIsValid));
    // console.log(form);
  };

  const handleValidation = (itemToControl, itemValue) => {
    let inputErrors = {};
    let isFormValid = true;

    if (!itemToControl || itemToControl === "email") {
      if (!itemValue) {
        isFormValid = false;
        inputErrors.email = "L'email doit être renseigné!";
      } else if (typeof itemValue !== undefined) {
        if (
          !itemValue.match(
            /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
          )
        ) {
          isFormValid = false;
          inputErrors.email = "Doit être un email!";
        }
      }
    }

    if (!itemToControl || itemToControl === "password") {
      if (!itemValue) {
        isFormValid = false;
        inputErrors.password = "Le mot de passe doit être renseigné!";
      } else if (typeof itemValue !== undefined) {
        if (!itemValue.match(/[A-Za-z\d]$/)) {
          isFormValid = false;
          inputErrors.password = "Ne doit contenir que des alphanumériques!";
        }
      }
    }

    setErrors(inputErrors);
    // setFormIsValid(isFormValid);
    // console.log("isFormValid", typeof (isFormValid));
    return isFormValid;
  };

  return (
    <>
      <React.Fragment>
        <Container style={{ minHeight: "50vh" }}>
          {/* <div className="div-tag"> */}
          <p style={{ color: "red" }}>{httpErrors}</p>
          <Row className="d-flex justify-content-center my-5">
            <Col md={6}>
              <Form onSubmit={authSubmitHandler} className="text-white mx-5">
                {/* <form className="form-tag" onSubmit={authSubmitHandler}> */}
                <h3
                  style={{ textTransform: "uppercase" }}
                  className="pb-3 border-bottom border-3 mb-5"
                >
                  Connexion
                </h3>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="email">
                    {" "}
                    Email: <span>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Entrer votre email"
                    onChange={(e) => handleChange(e)}
                    className="mb-3"
                  />
                  <Form.Text style={{ color: "red" }}>{errors.email}</Form.Text>
                </Form.Group>

                {/* <label htmlFor="email" className="label-tag">
            Email: <span>*</span>
          </label> */}

                {/* <input
            type="text"
            id="email"
            name="email"
            className="input-tag"
            placeholder="Renseigner l'email"
            onChange={(e) => handleChange(e)}
          />
          <span className="error-tag">{errors.email}</span> */}

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="password">
                    Password: <span>*</span>
                  </Form.Label>
                  <Form.Control
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Renseigner le mdp"
                    onChange={(e) => handleChange(e)}
                  />
                  <Form.Text style={{ color: "red" }}>
                    {errors.password}
                  </Form.Text>
                </Form.Group>

                {/* <label htmlFor="password" className="label-tag">
            Password: <span>*</span>
          </label> */}

                {/* <input
            type="password"
            id="password"
            name="password"
            className="input-tag"
            placeholder="Renseigner le mdp"
            onChange={(e) => handleChange(e)}
          />
          <span className="error-tag">{errors.password}</span> */}

                <Button
                  variant="warning"
                  type="submit"
                  disabled={!formIsValid}
                  style={{
                    backgroundColor: formIsValid ? "primary" : "warning",
                  }}
                  className="mt-3 mb-5"
                >
                  Login
                </Button>

                {/* <button type="submit" className="button-tag">LOGIN</button> */}
                {/* </form> */}
              </Form>
              <p className="text-secondary">
                Vous n'avez pas encore de compte?{" "}
                <a href="/signup">Créez le !</a>
              </p>
            </Col>
          </Row>
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
          {/* </div> */}
        </Container>
      </React.Fragment>
    </>
  );
};

export default Login;
