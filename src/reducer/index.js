import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import user from "./user";
import thunk from "redux-thunk";
import alert from "./alertActions";
import auth from "./auth";
import mesa from "./mesa";
import productos from "./productos";
import categoria from "./categoria";
import cierre from "./cierre";
import valor from "./valor";
import ficha_tecnica from "./ficha_tecnica";

const reducers = combineReducers({
  user,
  alert,
  auth,
  mesa,
  productos,
  categoria,
  cierre,
  valor,
  ficha_tecnica,
});

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export default store;
