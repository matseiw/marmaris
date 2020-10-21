import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { setUser } from "actions/authAction";
import { setMesas } from "actions/mesa";
import { setProductos } from "actions/productos";
import { setCategoria } from "actions/categoria";
import { setFicha } from "actions/ficha_tecnica";

const Auth = ({
  component: Component,
  setMesas,
  setProductos,
  path,
  auth,
  setCategoria,
  setUser,
  setFicha,
  ...rest
}) => {
  // setUser();
  useEffect(() => {
    setUser();
  }, [setUser]);

  useEffect(() => {
    setFicha();
  }, [setFicha]);

  useEffect(() => {
    setMesas();
  }, [setMesas]);

  useEffect(() => {
    setProductos();
  }, [setProductos]);

  useEffect(() => {
    setCategoria();
  }, [setCategoria]);

  const setUserCargo = () => {
    switch (auth.user.cargo) {
      case 1:
        return path === "/admin";
      case 2:
        return path === "/mesero";
      case 3:
        return path === "/cajero";
      default:
        return false;
    }
  };

  return (
    <>
      {!auth.loading && (
        <Route
          {...rest}
          render={(props) =>
            !auth.isAuth ? (
              <Redirect to={{ pathname: "/login" }} />
            ) : setUserCargo() ? (
              <Component {...props} />
            ) : (
              <Redirect to={{ pathname: "/no-autorizado" }} />
            )
          }
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
};

const mapDispatchToProps = {
  setUser,
  setMesas,
  setProductos,
  setCategoria,
  setFicha,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
