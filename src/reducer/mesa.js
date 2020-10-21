const initialState = { mesa: [], loading: true, mesasLibres: [] };

export default function (state = initialState, action) {
  switch (action.type) {
    case "SET_MESAS":
      return { ...state, mesa: action.payload, loading: false };
    case "SET_MESAS_LIBRES":
      return { ...state, mesasLibres: action.payload, loading: false };
    case "ADD_PEDIDO":
      return {
        ...state,
        mesasLibres: state.mesasLibres.map((mesa) =>
          mesa.idmesa === action.payload.idmesa ? action.payload : mesa
        ),
      };
    case "DELETE_PEDIDO":
      return {
        ...state,
        mesasLibres: state.mesasLibres.filter(
          (mesa) => action.payload !== mesa.idmesa
        ),
      };
    default:
      return state;
  }
}
