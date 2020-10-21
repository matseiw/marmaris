const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_FICHA":
      return [ ...payload];
    default:
      return state;
  }
};
