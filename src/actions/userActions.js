import useFetch from "hooks/useFetch";
import md5 from "md5";

export const setUser = () => (dispatch) => {
  useFetch
    .getAll("users")
    .then((resp) =>
      resp.code === 200
        ? dispatch({ type: "SET_USER", payload: { data: resp.data } })
        : dispatch({ type: "ERROR", payload: { resp } })
    );
};

export const updateUser = (id, data) => (dispatch) => {
  useFetch.updateOne(id, "users", data).then((resp) =>
    resp.code === 200
      ? (dispatch({ type: "UPDATE_USER", payload: { data, id } }),
        dispatch({
          type: "SUCCESS",
          payload: { code: resp.code, msg: resp.msg },
        }))
      : (console.log(resp),
        dispatch({
          type: "ERROR",
          payload: { code: resp.code, msg: resp.msg },
        }))
  );
};

export const deleteUser = (id) => (dispatch) => {
  useFetch.deleteOne(id, "users").then((resp) =>
    resp.code === 200
      ? (dispatch({ type: "DELETE_USER", payload: id }),
        dispatch({
          type: "SUCCESS",
          payload: { code: resp.code, msg: resp.msg },
        }))
      : (console.log(resp),
        dispatch({
          type: "ERROR",
          payload: { code: resp.code, msg: resp.msg },
        }))
  );
};
export const addUser = (user) => (dispatch) => {
  user.contraseña = md5(user.contraseña);
  const data = user;
  useFetch.addOne("users", user).then((resp) =>
    resp.code === 200
      ? (dispatch({ type: "ADD_USER", payload: data }),
        dispatch({
          type: "SUCCESS",
          payload: { code: resp.code, msg: resp.msg },
        }))
      : (dispatch({
          type: "ERROR",
          payload: { code: resp.code, msg: resp.msg },
        }),
        console.log(resp))
  );
};
