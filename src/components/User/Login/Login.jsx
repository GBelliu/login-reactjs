import React, { useState, useContext } from "react";
import StoreContext from "components/Store/Context";
import UIButton from "components/UI/Button/Button";

import "./Login.css";
import { useHistory } from "react-router-dom";
function initialState() {
  return { user: "", password: "" };
}

const UserLogin = () => {
  const [values, setValues] = useState(initialState);
  const { setToken } = useContext(StoreContext);
  const history = useHistory();

  function onChange(event) {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  }

  function onSubmit(event) {
    event.preventDefault();

    const { token } = login(values);

    if (token) {
      setToken(token);
      return history.push("/");
    }

    setValues(initialState);
  }

  function login({ user, password }) {
    if (user === "admin" && password === "admin") {
      return { token: "1234" };
    }
    return { error: "Usuário ou senha invalido" };
  }
  console.log(values);
  return (
    <div className="user-login">
      <h1 className="user-login__title">Acessar o Sistema</h1>
      <form autoComplete="nope" onSubmit={onSubmit}>
        <div className="user-login__form-control">
          <label htmlFor="email">Usuário</label>
          <input
            id="user"
            type="text"
            name="user"
            autoComplete="off"
            onChange={onChange}
            value={values.user}
          />
        </div>
        <div className="user-login__form-control">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={onChange}
            value={values.password}
          />
        </div>
        <UIButton
          type="submit"
          theme="contained-green"
          className="user-login__submit-button"
          rounded
        >
          Entrar
        </UIButton>
      </form>
    </div>
  );
};

export default UserLogin;
