const initialState = { productos: [] };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_PRODUCTOS":
      return { productos: payload };
    case "GET_PRODUCTOS":
      return { ...state };
    case "UPDATE_PRECIOS":
      return {
        productos: state.productos.map((producto) =>
          payload.map((p) =>
            producto.idproducto === p.idproducto
              ? { ...producto, precio: p.precio }
              : producto
          )
        ),
      };
    default:
      return state;
  }
};
