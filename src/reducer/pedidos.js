const initialState = {
  cierre: 0,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_PEDIDOS":
      return { ...state, pedidos: payload };
    case "GET_PEDIDOS":
      return { ...state };
    default:
      return state;
  }
};
