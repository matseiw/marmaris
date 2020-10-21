import useFetch from "hooks/useFetch";

export const setFicha = () => (dispatch) => {
  useFetch.getAll("ficha_tecnica").then(
    (res) =>
      res.code === 200 &&
      dispatch({
        type: "SET_FICHA",
        payload: res.ficha_tecnica,
      })
  );
};

export const updateFicha = (ficha) => (dispatch) => {
  console.log(ficha);
  useFetch.updateOne("", "ficha_tecnica", { ficha }).then(console.log);
};
