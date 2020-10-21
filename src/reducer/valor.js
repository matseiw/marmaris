const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_VALOR":
      return [...state, ...payload];

    default:
      return state;
  }
};
