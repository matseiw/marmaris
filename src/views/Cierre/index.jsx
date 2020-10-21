import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { setCierre } from "actions/pedidos";
import Currency from "currency-formatter";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { TablaCierre } from "components/tables/cierre";
import { usePrintFactura } from "hooks/usePrintFactura";

const Cierre = ({ setCierre }) => {
  useEffect(() => {
    setCierre();
  }, [setCierre]);
  const { cierre } = useSelector((state) => state.cierre);
  const { user } = useSelector((state) => state.auth);

  const [dinero, setDinero] = useState([
    { id: 1, valor: 100, cantidad: 0, tipo: "moneda", total: 0 },
    { id: 2, valor: 200, cantidad: 0, tipo: "moneda", total: 0 },
    { id: 3, valor: 500, cantidad: 0, tipo: "moneda", total: 0 },
    { id: 4, valor: 1000, cantidad: 0, tipo: "moneda", total: 0 },
    { id: 5, valor: 1000, cantidad: 0, tipo: "billetes", total: 0 },
    { id: 6, valor: 2000, cantidad: 0, tipo: "billetes", total: 0 },
    { id: 7, valor: 5000, cantidad: 0, tipo: "billetes", total: 0 },
    { id: 8, valor: 10000, cantidad: 0, tipo: "billetes", total: 0 },
    { id: 9, valor: 20000, cantidad: 0, tipo: "billetes", total: 0 },
    { id: 10, valor: 50000, cantidad: 0, tipo: "billetes", total: 0 },
    { id: 11, valor: 100000, cantidad: 0, tipo: "billetes", total: 0 },
  ]);
  const [total, setTotal] = useState(0);
  const { facturacion } = usePrintFactura({ dinero, cierre, total, user });
  useEffect(() => {
    var myTotal = 0;
    dinero.forEach((act) => (myTotal += act.total));
    setTotal(myTotal);
  }, [dinero]);
  console.log(user);

  const handleChange = ({ target }, id) => {
    setDinero((dinero) =>
      dinero.map((din) =>
        din.id === id
          ? { ...din, cantidad: target.value, total: target.value * din.valor }
          : din
      )
    );
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={facturacion}
        style={{ width: "100%" }}
      >
        Imprimir cierre
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Base</TableCell>
              <TableCell>Vendido</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Dinero en caja</TableCell>
              <TableCell>Diferencia</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                {Currency.format(200000, { code: "USD" }).slice(0, -3)}
              </TableCell>
              <TableCell>
                {Currency.format(cierre, { code: "USD" }).slice(0, -3)}
              </TableCell>
              <TableCell>
                {Currency.format(cierre + 200000, { code: "USD" }).slice(0, -3)}
              </TableCell>
              <TableCell>
                {Currency.format(total, { code: "USD" }).slice(0, -3)}
              </TableCell>

              <TableCell
                style={{
                  color: total === cierre + 200000 ? "#008f39" : "#FF0000",
                }}
              >
                {Currency.format(total - cierre - 200000, {
                  code: "USD",
                }).slice(0, -3)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TablaCierre dinero={dinero} handleChange={handleChange}></TablaCierre>
    </>
  );
};

const mapDispatchToProps = {
  setCierre,
};

export default connect(null, mapDispatchToProps)(Cierre);
