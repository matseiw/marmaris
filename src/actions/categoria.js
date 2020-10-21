import useFetch from "hooks/useFetch";

export const setCategoria = (payload) => (dispatch) => {
  useFetch.getAll("categoria").then((data) => {
    data.code === 200
      ? dispatch({
          type: "SET_CATEGORIA",
          payload: data.data,
        })
      : dispatch({ type: "ERROR" });
  });
};
