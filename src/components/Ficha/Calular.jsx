import {
  Button,
  Card,
  CardMedia,
  FormControl,
  FormHelperText,
  FormLabel,
  makeStyles,
  Modal,
  TextField,
} from "@material-ui/core";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import { useModal } from "hooks/useModal";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "scroll",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export const Calcular = ({ onChange, idingredientes, medida }) => {
  const [open, onOpen] = useModal(false);
  const [valor, setValor] = useState({ precio: 0, cantidad: 0 });

  const classes = useStyles();
  const handleOpen = () => {
    onOpen();
  };
  const { precio, cantidad } = valor;

  const handleChange = ({ target }) => {
    setValor({ ...valor, [target.name]: target.value });
  };

  const handleSubmit = () =>
    precio > 0 && cantidad > 0
      ? (onChange(
          {
            target: { name: "valor", value: precio / cantidad },
          },
          idingredientes,
          medida
        ),
        handleOpen())
      : alert("ningun valor puede ser menor que 0");

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Calcular
      </Button>
      <Modal className={classes.modal} open={open} onClose={handleOpen}>
        <Card>
          <CardHeader
            title="Calcular el precio"
            subheader="Ingrese el costo del producto y la cantidad que trajó"
          />
          <CardBody>
            <FormControl>
              <FormLabel>Precio</FormLabel>
              <TextField
                name="precio"
                value={precio}
                onChange={handleChange}
                type="number"
              />

              <FormHelperText>Ingrese el precio</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Cantidad</FormLabel>
              <TextField
                value={cantidad}
                name="cantidad"
                onChange={handleChange}
                type="number"
              />

              <FormHelperText>Ingrese la cantidad de elementos</FormHelperText>
            </FormControl>
            <CardMedia className={classes.buttonGroup}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Calcular
              </Button>
              <Button variant="contained" color="secondary">
                Cancelar
              </Button>
            </CardMedia>
          </CardBody>
        </Card>
      </Modal>
    </>
  );
};
