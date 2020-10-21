import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Store from "@material-ui/icons/Store";
import FastFood from "@material-ui/icons/Fastfood";

import DashboardPage from "views/Dashboard/Dashboard.jsx";
import { Mesa } from "views/pedidos";
import Platos from "views/platos";
import { Usuarios } from "views/usuarios/Usuarios";
import ingredientes from "views/ingredientes";
import PointOfSale from "@material-ui/icons/PriorityHigh";
import Cierre from "views/Cierre";

const AdminRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "Usuarios",
    icon: Person,
    component: Usuarios,
    layout: "/admin",
  },
  {
    path: "/mesa",
    name: "Mesas disponibles",
    icon: Store,
    component: Mesa,
    layout: "/admin",
  },
  {
    path: "/productos",
    name: "Ver productos",
    icon: FastFood,
    component: Platos,
    layout: "/admin",
  },
  {
    path: "/ingredientes",
    name: "Ver ingredientes",
    icon: FastFood,
    component: ingredientes,
    layout: "/admin",
  },
  {
    path: "/Cierre",
    name: "Cierre del día",
    icon: PointOfSale,
    component: Cierre,
    layout: "/admin",
  },
];

export default AdminRoutes;
