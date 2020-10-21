import {
  Button,
  Card,
  CardContent,
  makeStyles,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@material-ui/core";
import CardFooter from "components/Card/CardFooter";
import CardHeader from "components/Card/CardHeader";
import { useForm } from "hooks/useForm";
import React, { useState } from "react";
import { connect } from "react-redux";
import { updateUser, addUser } from "actions/userActions";

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
  width100: {
    width: "50%",
  },
}));

const EditUsers = ({
  user = {
    nombre: "",
    tipo_identificacion: 1,
    identificacion: "",
    cargo: 1,
    sueldo: 0,
    correo: "",
  },
  updateUser,
  addUser,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [
    {
      idusuario,
      nombre,
      tipo_identificacion,
      identificacion,
      cargo,
      sueldo,
      correo,
    },
    handleInputChange,
  ] = useForm(user);

  const handleSubmit = (event) => {
    event.preventDefault();
    idusuario
      ? updateUser(idusuario, {
          nombre,
          tipo_identificacion,
          identificacion,
          cargo,
          sueldo,
          correo,
        })
      : addUser({
          nombre,
          tipo_identificacion,
          identificacion,
          cargo,
          sueldo,
          correo,
        });
  };

  const handleTogle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        style={{ width: "100%" }}
        onClick={handleTogle}
      >
        {idusuario ? "Editar" : "Agregar Usuario"}
      </Button>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        className={classes.modal}
        onClose={handleTogle}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Card style={{ width: "700px" }}>
          <CardHeader>
            <h1>{idusuario ? "Editar" : "Agregar"} Usuario</h1>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => handleSubmit(e)}>
              <TextField
                className={classes.width100}
                label="Nombre"
                value={nombre}
                name="nombre"
                onChange={handleInputChange}
                variant="outlined"
              />
              <Select
                className={classes.width100}
                value={tipo_identificacion}
                name="tipo_identificacion"
                onChange={handleInputChange}
                variant="outlined"
                required
              >
                <MenuItem value={1}>Cedula</MenuItem>
                <MenuItem value={2}>Tarjeta de identidad</MenuItem>
                <MenuItem value={3}>Cedula extranjería</MenuItem>
              </Select>
              <TextField
                className={classes.width100}
                label="Identificacion"
                value={identificacion}
                name="identificacion"
                onChange={handleInputChange}
                variant="outlined"
                type="text"
                required
                inputProps={{
                  pattern: "((d{8})|(d{10})|(d{11})|(d{6}-d{5}))?",
                }}
              />
              <Select
                className={classes.width100}
                value={cargo}
                name="cargo"
                onChange={handleInputChange}
                variant="outlined"
                required
              >
                <MenuItem value={1}>Administrador</MenuItem>
                <MenuItem value={2}>Mesero</MenuItem>
                <MenuItem value={3}>Cajero</MenuItem>
                <MenuItem value={4}>Cliente</MenuItem>
              </Select>
              <TextField
                className={classes.width100}
                label="Sueldo"
                value={sueldo}
                name="sueldo"
                onChange={handleInputChange}
                variant="outlined"
                type="number"
                required
              />
              <TextField
                className={classes.width100}
                label="Correo"
                value={correo}
                name="correo"
                onChange={handleInputChange}
                variant="outlined"
                required
              />
            </form>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit}>
              {idusuario ? "Modificar" : "agregar"}
            </Button>
            <Button color="secondary" onClick={handleTogle}>
              Cancelar
            </Button>
          </CardFooter>
        </Card>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = {
  updateUser,
  addUser,
};

export default connect(null, mapDispatchToProps)(EditUsers);
