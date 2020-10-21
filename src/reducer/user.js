const initialState = {
  user: [],
  loading: true,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_USER":
      console.log(action.payload);
      return { ...state, user: [...state.user, action.payload] };
    case "SET_USER":
      return { ...state, user: action.payload.data, loading: false };
    case "DELETE_USER":
      return {
        ...state,
        user: { data: state.user.filter((u) => u.id !== action.payload) },
      };
    case "UPDATE_USER":
      console.log(action.payload);
      return {
        ...state,
        user: state.user.map((data) =>
          data.idusuario === action.payload.id
            ? { ...data, user: action.payload.data }
            : data
        ),
      };
    default:
      return state;
  }
}
