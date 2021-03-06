import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { connect, useSelector } from "react-redux";
import { updatePedido, facturar } from "actions/pedidos";
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
import { setClose, setClear } from "actions/alertAction";

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
});

function Mesa({ factura, updatePedido, facturar, setClose }) {
  const { productos } = useSelector((state) => state.productos);
  const auth = useSelector((state) => state.auth);
  const classes = useStyles();
  const { user } = useSelector((state) => state.user);
  const [productoSeleccionado, setProductoSeleccionado] = useState();



  const { msg, open } = useSelector((state) => state.alert);
  useEffect(() => {
    setClose();
    return () => {
      setClose();
    };
  }, [setClose]);
  const [pedidos, setPedidos] = useState(factura.cuerpo);
  const [facturas, setFactura] = useState({
    
    idmesero: factura.idmesero,
    nombreUsuario: auth.user.nombreUsuario,
    contraseña: "",
  });
  const [total, setTotal] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    setFactura({
      ...facturas,
      nombreUsuario: auth.user.nombreUsuario,
      idmesero: user.iduser,
    });
    console.log(facturas);

    pedidos.some((fac) => fac.cantidad <= 0)
      ? alert("la cantidad minima es de 0")
      : updatePedido({ pedidos, facturas });
    !open && handleOpen();
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

  const handlePasswordChange = ({ target }) => {
    setFactura({ ...facturas, contraseña: target.value });
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
    setTimeout(() => {
      pedidos.forEach((element) => (suma += element.precio * element.cantidad));
      setTotal(suma);
    }, 500);
  }, [pedidos]);

  const handleDelete = ({ target }, id) => {
    pedidos.length !== 1 &&
      setPedidos(pedidos.filter((pedido) => pedido.idproducto !== id));
  };

  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(!openModal);
  };
  return (
    <>
      <FormError open={open} msg={msg} handleOpen={setClose} />
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Modificar
      </Button>
      <Modal className={classes.root} open={openModal} onClose={handleOpen}>
        <Card className={classes.card}>
          <CardHeader title="Agregar nuevo pedido" subheader="Mesa" />
          <CardBody>
            <div>
              <Autocomplete
                id="combo-box-demo"
                value={productos}
                onChange={(event, newValue) => {
                  handleAutoComplete(newValue);
                }}
                options={productos}
                getOptionLabel={(option) => option.nombre}
                inputValue={productoSeleccionado}
                onInputChange={(event, newInputValues) => {
                  setProductoSeleccionado({
                    nombre: newInputValues,
                  });
                }}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Combo box" variant="outlined" />
                )}
              />
            </div>
            {pedidos.length !== 0 && (
              <>
                <form onSubmit={handleSubmit}>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <TextField
                      type="password"
                      value={facturas.password}
                      onChange={handlePasswordChange}
                      label="contraseña"
                      required
                    />
                  </div>
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
                          <TableCell>{pedido.precio}</TableCell>
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

const mapDispatchToProps = { updatePedido, setClose, facturar, setClear };

export default connect(null, mapDispatchToProps)(Mesa);
