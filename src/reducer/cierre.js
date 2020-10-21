const initialState = { cierre: 0 };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_CIERRE":
      console.log(payload);
      return { ...state, cierre: payload };

    default:
      return state;
  }
};
