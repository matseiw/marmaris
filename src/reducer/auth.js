const initialState = {
  user: {},
  isAuth: false,
  key: localStorage.getItem("key"),
  loading: true,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("key", action.payload.key);
      return {
        ...state,
        user: action.payload.data[0],
        isAuth: true,
        loading: false,
        key: action.payload.key,
      };
    case "SET_USER_LOGGED":
      return {
        ...state,
        user: action.payload,
        isAuth: true,
        loading: false,
      };
    case "LOGIN_FAIL":
    case "LOGOUT":
      localStorage.removeItem("key");
      return { ...state, user: {}, isAuth: false, loading: false };
    default:
      return state;
  }
}
