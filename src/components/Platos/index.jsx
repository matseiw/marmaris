import {
  Button,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { updatePrecios } from "actions/productos";
import { setValor } from "actions/valorAction";

import Currency from "currency-formatter";
import { useSearch } from "hooks/useSearch";
const ListaPlatos = ({ updatePrecios, setValor }) => {
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

  const valor = useSelector((state) => state.valor);

  useEffect(() => {
    setValor();
  }, []);

  const [producto, setProducto] = useState([]);

  useEffect(() => {
    const perdida = valor.filter((v) => v.precio < v.valor);
    setProducto(perdida);
  }, [valor]);
  const [data, response, onChange] = useSearch(producto);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProducto = producto.filter((pro) => pro.changed);
    updatePrecios(newProducto);
  };
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
  updatePrecios,
  setValor,
};

export default connect(null, mapDispatchToProps)(ListaPlatos);
