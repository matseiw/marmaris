import { Button, Card, makeStyles, Modal, TextField } from "@material-ui/core";
import CardBody from "components/Card/CardBody";
import { useModal } from "hooks/useModal";
import React from "react";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "scroll",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),

    display: "flex",
    flexDirection: "column",
  },
  form: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px",
  },
}));

export const Cambio = ({
  efectivo,
  handleChange,
  total,
  devuelta,
  facturar,
}) => {
  const [open, handleOpen] = useModal(false);

  const onChange = ({ target }) => {
    handleChange({ efectivo: target.value, devuelta: target.value - total });
    console.log(efectivo);
  };

  const handleFactura = () => {
    efectivo < total
      ? alert("el dinero ingresado es menor al total")
      : facturar();
  };

  const classes = useStyles();
  return (
    <>
      <Button variant="contained" color="default" onClick={handleOpen}>
        Facturar
      </Button>
      <Modal className={classes.modal} open={open} onClose={handleOpen}>
        <Card>
          <CardBody className={classes.paper}>
            <div className={classes.form}>
              <TextField
                value={efectivo}
                onChange={onChange}
                label="ingrese el efectivo"
                name="efectivo"
                type="number"
              />
              <TextField label="Total" disabled value={total} />
              <TextField label="Devuelta" disabled value={devuelta} />
            </div>
            <div className={classes.form}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleFactura}
              >
                Facturar
              </Button>
              <Button color="secondary" variant="contained" onClick={handleOpen}>
                Cancelar
              </Button>
            </div>
          </CardBody>
        </Card>
      </Modal>
    </>
  );
};
