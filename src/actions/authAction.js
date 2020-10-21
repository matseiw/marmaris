import useFetch from "hooks/useFetch";
import md5 from "md5";

export const login = (user) => (dispatch) => {
  user.contraseña = md5(user.contraseña);
  const promise = new Promise((resolve, reject) => {
    useFetch
      .addOne("auth", user)
      .then((resp) =>
        resp.code === 200
          ? (dispatch({ type: "LOGIN", payload: resp }), resolve(resp))
          : dispatch({ type: "ERROR", payload: resp }, reject(resp))
      );
  });
  return promise;
};

export const logout = () => (dispatch) => {
  dispatch({ type: "LOGOUT" });
};

export const setUser = () => async (dispatch) => {
  const authorization = localStorage.getItem("key");
  const data = await useFetch.getAll("auth", { authorization });
  data.code === 401
    ? dispatch({ type: "LOGIN_FAIL" })
    : dispatch({ type: "SET_USER_LOGGED", payload: data });
};
