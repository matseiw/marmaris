import useFetch from "hooks/useFetch";

export const setValor = () => (dispatch) => {
  useFetch.getAll("productos/precios").then(({ data }) => {
    dispatch({
      type: "SET_VALOR",
      payload: data,
    });
  });
};
