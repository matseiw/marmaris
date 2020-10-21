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
import { connect, useSelector } from "react-redux";
import { addUser } from "actions/userActions";
import { Calendar } from "components/Date/Calendar";
import { useModal } from "hooks/useModal";
import validator from "common/validator";
import { FormError } from "./FormError";

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

const AddUser = ({
  user = {
    nombre: "",
    tipo_identificacion: 1,
    identificacion: "",
    cargo: 1,
    sueldo: 0,
    correo: "",
    nombreUsuario: "",
    contraseña: "",
    fecha_nacimiento: new Date(),
  },

  addUser,
}) => {
  const classes = useStyles();
  const users = useSelector((state) => state.user.user);
  const [userNameModal, setOpenUserNameModal] = useModal();
  const [emailModal, setOpenEmailModal] = useModal();
  const [identificacionModal, setOpenIdentificacionModal] = useModal();
  const [open, setOpen] = useState(false);
  const [
    {
      idusuario,
      nombre,
      tipo_identificacion,
      identificacion,
      fecha_nacimiento,
      cargo,
      sueldo,
      correo,
      nombreUsuario,
      contraseña,
    },
    handleInputChange,
  ] = useForm(user);

  const handleSubmit = (event) => {
    event.preventDefault();
    const info = validator.unique(users, "nombreUsuario", nombreUsuario);
    const emailValidator = validator.unique(users, "correo", correo);
    const identificadorValidator = validator.unique(
      users,
      "identificacion",
      identificacion
    );
    info
      ? setOpenUserNameModal()
      : emailValidator
      ? setOpenEmailModal()
      : identificadorValidator
      ? setOpenIdentificacionModal()
      : addUser({
          nombre,
          tipo_identificacion,
          identificacion,
          cargo,
          sueldo,
          fecha_nacimiento,
          correo,
          nombreUsuario,
          contraseña,
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
        Agregar usuario
      </Button>
      <FormError
        open={userNameModal}
        handleOpen={setOpenUserNameModal}
        msg="El nobre de usuario ya fue elegido"
      />
      <FormError
        open={emailModal}
        handleOpen={setOpenEmailModal}
        msg="El correo electronico ya fue elegido"
      />
      <FormError
        open={identificacionModal}
        handleOpen={setOpenIdentificacionModal}
        msg="La identificacion ya fue elegida"
      />

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
            <form onSubmit={handleSubmit}>
              <TextField
                className={classes.width100}
                label="Nombre"
                value={nombre}
                name="nombre"
                min={2}
                required
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
                  pattern: "[0-9]{6,10}",
                }}
              />
              <Calendar
                date={fecha_nacimiento}
                onChange={handleInputChange}
                name="fecha_nacimiento"
                required
                className={classes.width100}
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
              <TextField
                className={classes.width100}
                label="nombre de usuario"
                value={nombreUsuario}
                name="nombreUsuario"
                onChange={handleInputChange}
                variant="outlined"
                required
              />
              <TextField
                className={classes.width100}
                label="Contraseña"
                value={contraseña}
                name="contraseña"
                onChange={handleInputChange}
                variant="outlined"
                required
                type="password"
              />
              <CardFooter>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  className="my-2"
                  type="submit"
                >
                  Agregar
                </Button>
                <Button color="secondary" onClick={handleTogle}>
                  Cancelar
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = {
  addUser,
};

export default connect(null, mapDispatchToProps)(AddUser);
