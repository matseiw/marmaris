import { Mesa } from "views/pedidosMesero";

import Store from "@material-ui/icons/Store";

const AdminRoutes = [
  {
    path: "/Dashboard",
    name: "Mesas disponibles",
    icon: Store,
    component: Mesa,
    layout: "/mesero",
  },
];

export default AdminRoutes;
