import { Button, makeStyles, Modal, Paper, TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useModal } from "hooks/useModal";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { usePedido } from "hooks/useFicha";
const useStyles = makeStyles({
  root: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    height: "120%",
    justifyContent: "space-between",
  },
});

const Error = ({ message }) => {
  return <Alert severity="error">{message} </Alert>;
};

export const FacturarDomicilio = ({ factura, print }) => {
  const classes = useStyles();
  const [open, handleOpen] = useModal(false);
  const { nombreUsuario } = useSelector((state) => state.auth.user);
  const { control, handleSubmit, errors } = useForm();
  const [state, update] = usePedido();

  const onSubmit = (data) => {
    update(factura.idfactura, {
      contraseña: data.contraseña,
      nombreUsuario,
    })
      .then((data) => {
        print();
        handleOpen();
      })
      .catch(alert);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Facturar
      </Button>
      <Modal open={open} onClose={handleOpen} className={classes.root}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Paper className={classes.card}>
            <h1>Facturar pedido</h1>
            <Controller
              as={TextField}
              name="contraseña"
              placeholder="ingrese la contraseña"
              control={control}
              required
              type="password"
              rules={{
                required: { message: "Este campo es necesario" },
                minLength: { value: 4, message: "caracteres minimos son 4" },
              }}
            />
            {errors.contraseña?.type === "minLength" && (
              <Error message="cantidad minima es de 4 caracteres" />
            )}
            <Button color="primary" type="submit">
              Facturar
            </Button>
          </Paper>
        </form>
      </Modal>
    </div>
  );
};
