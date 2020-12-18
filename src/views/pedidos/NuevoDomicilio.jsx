import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { connect, useSelector } from "react-redux";
import { addDomicilio } from "actions/pedidos";
import {
  Button,
  Card,
  CardHeader,
  makeStyles,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
} from "@material-ui/core";
import CardBody from "components/Card/CardBody";
import { FormError } from "components/Modal/FormError";
import { setClose } from "actions/alertAction";
import { blue } from "@material-ui/core/colors";
const useStyles = makeStyles({
  root: {
    border: 0,
    position: "absolute",
    overflow: "scroll",
  },
  card: {
    width: "100%",
    maxWidth: "90vw",
    maxHeight: "100%",
    position: "fixed",
    overflow: "scroll",
    top: "50%",
    left: "5vw",
    transform: "translate(0, -50%)",
    overflowY: "none",
  },
  options: {
    display: "flex",
    justifyContent: "space-between",
  },
  input: {
    "&:invalid": {
      border: "red solid 2px",
    },
  },
  button: {
    display: 'block',
    marginBottom: '10px',
    background: blue[500],
    width: '100%'
  }
});

function Mesa({ addDomicilio, setClose }) {
  const { productos } = useSelector((state) => state.productos);
  const { user } = useSelector((state) => state.auth);
  const usuario = useSelector((state) => state.user.user);
  const classes = useStyles();
  const { msg, open } = useSelector((state) => state.alert);

  useEffect(() => {
    setClose();
    return () => {
      setClose();
    };
  }, [setClose]);

  const [pedidos, setPedidos] = useState([]);
  const [factura, setFactura] = useState({
    idmesero: user.idusuario,
    nombreUsuario: user.nombreUsuario,
    contraseña: "",
  });
  const [total, setTotal] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    setFactura({
      ...factura,
      nombreUsuario: user.nombreUsuario,
      idmesero: user.idusuario,
    });
    if (total <= factura.efectivo) {
      pedidos.some((fac) => fac.cantidad <= 0)
        ? alert("la cantidad minima es de 0")
        : addDomicilio(factura, pedidos);
      !open && handleOpen();
    } else alert('El efectivo con el que cancela no puede ser menor al total')
    console.log(msg);
  };

  const handleAutoComplete = (value) => {
    if (value) {
      if (pedidos.some((data) => data.idproducto === value.idproducto))
        alert("ya se agregó ese producto");
      else {
        const newPedido = {
          ...value,
          cantidad: 0,
          comentario: "",
          subtotal: 0,
        };
        setPedidos([...pedidos, { ...newPedido }]);
      }
    }
  };

  const handleUsuarioChange = ({ target }) => {
    setFactura({ ...factura, [target.name]: target.value });
  };

  const handleAutoCompleteCliente = (value) => {

    if (value) {
      setFactura({
        ...factura,
        idcliente: value.idusuario,
        nombre: value.idusuario !== 12 ? value.nombre : "",
        telefono: value.telefono,
        direccion: value.direccion,
      });
    }
  };

  const handlePasswordChange = ({ target }) => {
    setFactura({ ...factura, contraseña: target.value });
  };

  const handleChange = ({ target }, id) => {
    const actualPedido = pedidos.map((x) =>
      x.idproducto === id ? { ...x, [target.name]: target.value } : x
    );
    const actual = actualPedido.map((element) => {
      return { ...element, subtotal: element.precio * element.cantidad };
    });
    setPedidos(actual);
  };

  useEffect(() => {
    var suma = 0;
    pedidos.forEach((element) => (suma += element.subtotal));

    setTotal(suma);
  }, [pedidos]);

  const handleDelete = ({ target }, id) => {
    setPedidos(pedidos.filter((pedido) => pedido.idproducto !== id));
  };

  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(!openModal);
    setPedidos([]);
    // setFactura([]);
  };
  return (
    <>
      <FormError open={open} msg={msg} handleOpen={setClose} />
      <Button className={classes.button} variant="contained" color="secondary" onClick={handleOpen}>
        Agregar Domicilio
      </Button>
      <Modal className={classes.root} open={openModal} onClose={handleOpen}>
        <Card className={classes.card}>
          <CardHeader title="Agregar nuevo pedido" subheader="Mesa" />
          <CardBody>
            <div className={classes.options}>
              <Autocomplete
                value={usuario}
                onChange={(event, newValue) => {
                  handleAutoCompleteCliente(newValue);
                }}
                options={usuario.filter((usu) => usu.cargo === 4)}
                getOptionLabel={(option) => option.telefono !== null ? option.telefono : 'Cliente anonimo'}
                noOptionsText='Nuevo cliente'
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Cliente" variant="outlined" />
                )}
              />
              <Autocomplete
                value={productos}
                onChange={(event, newValue) => {
                  handleAutoComplete(newValue);
                }}
                options={productos}
                getOptionLabel={(option) => option.nombre}


                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Producto" variant="outlined" />
                )}
              />
            </div>

            {pedidos.length !== 0 && (
              <>
                <form onSubmit={handleSubmit}>
                  <TextField
                    type="password"
                    value={factura.password}
                    onChange={handlePasswordChange}
                    label="ingrese su contraseña"
                    required
                  />
                  <TextField
                    name="nombre"
                    value={factura.nombre}
                    label="nombre"
                    required
                    onChange={handleUsuarioChange}
                  />

                  <TextField
                    name="telefono"
                    value={factura.telefono}
                    label="telefono"
                    required
                    onChange={handleUsuarioChange}
                    inputProps={{
                      className: classes.input,
                      pattern: "3[0-2][0-9]{8}",
                    }}
                  />

                  <TextField
                    name="direccion"
                    value={factura.direccion}
                    label="direccion"
                    required
                    onChange={handleUsuarioChange}
                  />
                  <TextField
                    name="efectivo"
                    value={factura.efectivo}
                    label="cancela con"
                    required
                    onChange={handleUsuarioChange}
                    type="number"
                  />

                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableCell>Producto</TableCell>
                        <TableCell>Cantidad</TableCell>
                        <TableCell>Precio</TableCell>
                        <TableCell>Comentarios</TableCell>
                        <TableCell>Subtotal</TableCell>
                        <TableCell>Acciones</TableCell>
                      </TableHead>
                      {pedidos.map((pedido) => (
                        <TableBody>
                          <TableCell>{pedido.nombre}</TableCell>
                          <TableCell>
                            <TextField
                              type="number"
                              value={pedido.cantidad}
                              name="cantidad"
                              onChange={(e) =>
                                handleChange(e, pedido.idproducto)
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              type='number'
                              value={pedido.precio}
                              name='precio'
                              onChange={(e) =>
                                handleChange(e, pedido.idproducto)}
                            />

                          </TableCell>
                          <TableCell>
                            <TextField
                              type="text"
                              multiline
                              value={pedido.comentario}
                              name="comentario"
                              onChange={(e) =>
                                handleChange(e, pedido.idproducto)
                              }
                            />
                          </TableCell>
                          <TableCell>
                            {pedido.precio * pedido.cantidad}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={(e) =>
                                handleDelete(e, pedido.idproducto)
                              }
                            >
                              eliminar
                            </Button>
                          </TableCell>
                        </TableBody>
                      ))}
                    </Table>
                    <h3>Total: {total} </h3>
                    <Button
                      style={{ width: "100%", marginTop: "25px" }}
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Envíar
                    </Button>
                  </TableContainer>
                </form>
              </>
            )}
          </CardBody>
        </Card>
      </Modal>
    </>
  );
}

const mapDispatchToProps = { addDomicilio, setClose };

export default connect(null, mapDispatchToProps)(Mesa);
