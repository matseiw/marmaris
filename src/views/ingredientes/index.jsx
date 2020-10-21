import { useSearch } from "hooks/useSearch";
import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { setFicha } from "actions/ficha_tecnica";
import { TextField } from "@material-ui/core";
import Ficha from "components/Ficha";

const Ingredientes = ({ setFicha }) => {
  const ficha_tecnica = useSelector((state) => state.ficha_tecnica);
  useEffect(() => {
    setFicha();
  }, [setFicha]);

  const [producto, setProducto] = useState([]);

  useEffect(() => {
    setProducto(ficha_tecnica);
    return () => {
      setProducto([]);
    };
  }, [ficha_tecnica]);

  const [data, response, onChange] = useSearch(producto);

  return (
    <>
      <TextField
        label="buscar por nombre"
        name="search"
        value={data}
        autoFocus
        onChange={onChange}
      />

      <Ficha res={response()} />
    </>
  );
};

const mapDispatchToProps = {
  setFicha,
};

export default connect(null, mapDispatchToProps)(Ingredientes);
