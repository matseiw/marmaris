const initialState = { categoria: [] };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_CATEGORIA":
      return { ...state, categoria: payload };

    default:
      return state;
  }
};
