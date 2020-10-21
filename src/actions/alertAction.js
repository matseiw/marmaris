export const setClose = () => (dispatch) => {
  dispatch({ type: "CLOSE" });
};

export const setClear = () => ({
  type: 'SET_CLEAR',
})
