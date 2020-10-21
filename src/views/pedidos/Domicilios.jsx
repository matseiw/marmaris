import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useSelector } from "react-redux";
import { usePrintFactura } from "hooks/usePrintFactura";
import { FacturarDomicilio } from "components/Modal/FacturarDomicilio";
import DeletePedido from "./DeletePedido";
import UpdateDomicilio from "components/Modal/UpdateDomicilio";

export const Domicilios = ({ factura }) => {
  const [total, setTotal] = useState(0);
  const { user } = useSelector((state) => state.user);
  const meseroInfo = user.filter((u) => u.idusuario === factura.idmesero);
  const { print, comanda } = usePrintFactura({
    pedidos: factura.cuerpo,
    user: meseroInfo[0],
    mesa: { nombre: factura.direccion, domicilio: true },
    efectivo: factura.efectivo,
    devuelta: factura.efectivo - total,
    cliente: { nombre: factura.nombre, numero: factura.celular },
  });

  useEffect(() => {
    let total = 0;
    factura.cuerpo.forEach(
      (cuerpo) => (total += cuerpo.cantidad * cuerpo.precio)
    );
    setTotal(total);
  }, []);
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {factura.nombre}{" "}
          <Typography variant="subtitle1">
            <b>Direccion:</b> {factura.direccion}
          </Typography>
          <Typography variant="subtitle1">
            {factura.efectivo}
            <b> :Cancela con</b>
          </Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Precio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {factura.cuerpo.map(({ nombre, cantidad, precio }) => (
              <TableRow>
                <TableCell>{nombre}</TableCell>
                <TableCell>{cantidad}</TableCell>
                <TableCell>{precio}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <Typography variant="h6">
            <b>Total</b> {total}
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button variant="outlined" color="secondary" onClick={comanda}>
              Comanda
            </Button>
            <FacturarDomicilio
              pedidos={factura.cuerpo}
              factura={factura}
              print={print}
            />
            <DeletePedido id={factura}></DeletePedido>
            <UpdateDomicilio factura={factura} print={print} />
          </div>
        </Table>
      </AccordionDetails>
    </Accordion>
  );
};
