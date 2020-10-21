const initialState = {
  msg: "",
  code: "",
  open: false,
  type: "",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "ERROR":
      return {
        ...state,
        msg: action.payload.msg,
        code: action.payload.code,
        open: true,
        type: "error",
      };
    case "SUCCESS":
      return {
        ...state,
        msg: action.payload.msg,
        code: action.payload.code,
        open: true,
        type: "success",
      };
    case "CLOSE":
      return {
        ...state,
        open: false,
      };
    case "CLEAR":
      return {
        ...state,
        open: false,
        error: "",
        type: "",
      };
    default:
      return {
        ...state,
      };
  }
}
