import md5 from "md5";
import { useReducer } from "react";
import reducer from "reducer/pedidos";
import useFetch from "./useFetch";

const initialState = {
  cierre: 0,
};

export const usePedido = () => {
  /* eslint-disable no-unused-vars */
  const [state, dispatch] = useReducer(reducer, initialState);
  const updatePedido = async (id, { contraseña, nombreUsuario }) => {
    contraseña = contraseña.length !== 0 && md5(contraseña);
    const resp = await useFetch.updateOne(id, "pedidos/facturar", {
      contraseña,
      nombreUsuario,
    });
    const respuesta = new Promise((resolve, reject) =>
      resp.code !== 200
        ? (dispatch({ type: "ERROR", payload: { msg: resp.msg, code: 403 } }),
          reject(resp.msg))
        : resolve("se ha facturado con exito")
    );
    return respuesta;
  };
  return [updatePedido];
};
