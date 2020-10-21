import {
  Button,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { useSearch } from "hooks/useSearch";
import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { setValor } from "actions/valorAction";
import { updatePrecios } from "actions/productos";


import Currency from "currency-formatter";
import Alert from "@material-ui/lab/Alert";

const Platos = ({ setValor, updatePrecios }) => {
  useEffect(() => {
    setValor();
  }, [setValor]);
  const valorProducto = useSelector((state) => state.valor);

  

  const [producto, setProducto] = useState(
    valorProducto.map((pro) => {
      return { ...pro, changed: false };
    })
  );

  useEffect(() => {
    setProducto(valorProducto);
  }, [valorProducto]);

  const handleChange = ({ target }, id) => {
    setProducto(
      producto.map((pro) => {
        if (pro.idproducto === id) {
          return {
            ...pro,
            idproducto: id,
            precio: target.value,
            changed: true,
          };
        } else {
          return pro;
        }
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProducto = producto.filter((pro) => pro.changed);
    updatePrecios(newProducto);
  };

  
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
      <form onSubmit={handleSubmit}>
        <Button
          variant="contained"
          color="primary"
          style={{ width: "100%", marginTop: "10px" }}
          type="submit"
        >
          Enviar
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Precio minimo</TableCell>
            </TableRow>
            {console.log(response())}
            {response().map((res) => (
              <TableRow>
                <TableCell>{res.nombre}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    style={{ width: "100%" }}
                    value={res.precio}
                    label="valor de producto"
                    onChange={(e) => handleChange(e, res.idproducto)}
                  ></TextField>
                  {console.log(res.precio < 120)}
                  {res.precio < res.valor ? (
                    <Alert severity="warning">
                      El producto generaría perdida de{" "}
                      <b>
                        {Currency.format(res.valor - res.precio, {
                          code: "USD",
                          thousand: ".",
                        }).slice(0, -3)}
                      </b>{" "}
                      y porcentaje del{" "}
                      <b>
                        {Math.round((1 - res.precio / res.valor) * 100, 2)}%
                      </b>
                    </Alert>
                  ) : (
                    <Alert severity="success">
                      El producto generaría una ganancia de{" "}
                      <b>
                        {Currency.format(res.precio - res.valor, {
                          code: "USD",
                          thousand: ".",
                        }).slice(0, -3)}
                      </b>{" "}
                      y porcentaje del{" "}
                      <b>
                        {Math.round((res.precio / res.valor - 1) * 100, 2)}%
                      </b>
                    </Alert>
                  )}
                </TableCell>
                <TableCell>
                  {Currency.format(res.valor, {
                    code: "USD",
                    thousand: ".",
                  }).slice(0, -3)}{" "}
                </TableCell>
              </TableRow>
            ))}
          </TableHead>
        </Table>
      </form>
    </>
  );
};

const mapDispatchToProps = {
  setValor,
  updatePrecios,
};

export default connect(null, mapDispatchToProps)(Platos);
