import useFetch from "hooks/useFetch";
import md5 from "md5";
export const setPedidos = (payload) => (dispatch) => {
  useFetch.getAll("pedidos").then()({
    type: "SET_PEDIDOS",
    payload,
  });
};

export const addPedido = (factura, facturaCuerpo, Authorization) => (
  dispatch
) => {
  const cuerpo = facturaCuerpo.map((body) => {
    return {
      producto: body.idproducto,
      precio: body.precio,
      cantidad: body.cantidad,
      comentario: body.comentario,
    };
  });
  factura.contraseña = md5(factura.contraseña);
  useFetch
    .addOne("pedidos", { ...factura, cuerpo }, Authorization)
    .then((data) =>
      data.code === 200
        ? (console.log(data),
          dispatch({ type: "ADD_PEDIDO", payload: { factura, cuerpo } }))
        : (console.log(data),
          dispatch({ type: "ERROR", payload: { msg: data.msg, code: 403 } }))
    );
};
export const addDomicilio = (factura, facturaCuerpo, Authorization) => (
  dispatch
) => {
  const cuerpo = facturaCuerpo.map((body) => {
    return {
      producto: body.idproducto,
      precio: body.precio,
      cantidad: body.cantidad,
      comentario: body.comentario,
    };
  });
  factura.contraseña = md5(factura.contraseña);
  console.log(factura);
  useFetch
    .addOne("pedidos/domicilio", { ...factura, cuerpo }, Authorization)
    .then((data) =>
      data.code === 200
        ? (console.log(data),
          dispatch({ type: "ADD_PEDIDO", payload: { factura, cuerpo } }))
        : (console.log(data),
          dispatch({ type: "ERROR", payload: { msg: data.msg, code: 403 } }))
    );
};

export const addPedidoMesero = (factura, facturaCuerpo, Authorization) => (
  dispatch
) => {
  const cuerpo = facturaCuerpo.map((body) => {
    return {
      producto: body.idproducto,
      precio: body.precio,
      cantidad: body.cantidad,
      comentario: body.comentario,
    };
  });
  useFetch
    .addOne("pedidos/mesero", { ...factura, cuerpo }, Authorization)
    .then((data) =>
      data.code === 200
        ? (console.log(data),
          dispatch({ type: "ADD_PEDIDO", payload: { factura, cuerpo } }))
        : (console.log(data),
          dispatch({ type: "ERROR", payload: { msg: data.msg, code: 403 } }))
    );
};

export const deletePedido = (id) => (dispatch) => {
  useFetch
    .deleteOne(id, "pedidos")
    .then((res) => dispatch({ type: "DELETE_PEDIDO", payload: id }));
};

export const updatePedido = ({ pedidos, facturas }) => (dispatch) => {
  const cuerpo = pedidos.map((body) => {
    return {
      producto: body.idproducto,
      precio: body.precio,
      cantidad: body.cantidad,
      comentario: body.comentario,
    };
  });
  facturas.contraseña = md5(facturas.contraseña);
  useFetch
    .updateOne(pedidos[0].factura, "pedidos", { cuerpo, ...facturas })
    .then(
      (data) =>
        data.code !== 200 &&
        dispatch({ type: "ERROR", payload: { msg: data.msg, code: 403 } })
    );
};

export const facturar = (id, { contraseña, nombreUsuario }) => async (
  dispatch
) => {
  contraseña = contraseña.length !== 0 && md5(contraseña);
  const resp = await useFetch.updateOne(id, "pedidos/facturar", {
    contraseña,
    nombreUsuario,
  });
  const respuesta = new Promise((resolve, reject) =>
    resp.code !== 200
      ? (dispatch({ type: "ERROR", payload: { msg: resp.msg, code: 403 } }),
        reject(resp.msg))
      : resolve("se ha facturado con exito")
  );
  return respuesta;
};

export const setCierre = () => (dispatch) => {
  useFetch
    .getAll("pedidos/cierre")
    .then((data) =>
      dispatch({ type: "SET_CIERRE", payload: data.data[0].cierre })
    );
};
