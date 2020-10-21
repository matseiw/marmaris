import useFetch from "hooks/useFetch";

export const setProductos = () => (dispatch) => {
  useFetch.getAll("productos").then((data) =>
    data.code === 200
      ? dispatch({ type: "SET_PRODUCTOS", payload: data.data })
      : dispatch({
          type: "ERRORS",
          payload: data.msg,
        })
  );
};

export const getProductos = (payload) => ({
  type: "GET_PRODUCTOS",
  payload,
});

export const updatePrecios = (precios) => (dispatch) => {
  const productos = precios.map(({ precio, idproducto }) => ({
    precio,
    idproducto,
  }));
  useFetch
    .updateOne("precios", "productos", { productos })
    .then((pre) => dispatch({ type: "UPDATE_PRECIOS", payload: productos }));
};
