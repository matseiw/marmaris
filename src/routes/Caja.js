import Store from "@material-ui/icons/Store";
import { Mesa } from "views/pedidos";
import PointOfSale from '@material-ui/icons/PriorityHigh'
import Cierre from "views/Cierre";

const AdminRoutes = [
  {
    path: "/dashboard",
    name: "Mesas disponibles",
    icon: Store,
    component: Mesa,
    layout: "/cajero",
  },
  {
    path: "/Cierre",
    name: "Cierre del día",
    icon: PointOfSale,
    component: Cierre,
    layout: "/cajero",
  },
];

export default AdminRoutes;
