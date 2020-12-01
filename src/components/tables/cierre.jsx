import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "spcae-evenly",
  },
  table:{
      marginLeft:'10px'
  }
});

export const TablaCierre = ({dinero, handleChange}) => {
  const classes = useStyles();
  
  return (
    <TableContainer className={classes.container}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Valor</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dinero
            .filter((money) => money.tipo === "moneda")
            .map((din) => (
              <TableRow key={din.id}>
                <TableCell>{din.valor} </TableCell>
                <TableCell>
                  <TextField
                    value={din.cantidad}
                    label="Cantidad"
                    type='number'
                    onChange={(e) => handleChange(e, din.id)}
                  />
                </TableCell>
                <TableCell>{din.tipo} </TableCell>
                <TableCell>{din.total} </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Table size="small" className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Valor</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dinero
            .filter((money) => money.tipo === "billetes")
            .map((din) => (
              <TableRow key={din.id}>
                <TableCell>{din.valor} </TableCell>
                <TableCell>
                  <TextField
                    value={din.cantidad}
                    label="Cantidad"
                    onChange={(e) => handleChange(e, din.id)}
                  />
                </TableCell>
                <TableCell>{din.tipo} </TableCell>
                <TableCell>{din.total} </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
