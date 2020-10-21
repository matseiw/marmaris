import useFetch from "hooks/useFetch";

export const setMesas = () => (dispatch) => {
  useFetch.getAll("mesa").then(({ data }) => {
    dispatch({ type: "SET_MESAS", payload: data });
  });
};

export const getMesasDisponibles = (Authorization = "") => (dispatch) => {
  useFetch
    .getAll("pedidos", Authorization)
    .then(
      ({ data }) => (
        dispatch({ type: "SET_MESAS_LIBRES", payload: data })
      )
    );
};
