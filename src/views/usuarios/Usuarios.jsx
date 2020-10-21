import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Alert from "components/Alert";
import DeleteUsers from "components/Modal/DeleteUsers";
import EditUsers from "components/Modal/EditUsers";
import AddUser from "components/Modal/AddUser";

import React from "react";
import { useSelector } from "react-redux";

export const Usuarios = () => {
  const { user, loading } = useSelector((state) => state.user);

  const switchTipoIdentificacion = (tipo) => {
    switch (tipo) {
      case 1:
        return "Cedula";
      case 2:
        return "Tarjeta de identidad";
      default:
        return "Cédula extrajería";
    }
  };

  const switchCargo = (cargo) => {
    switch (cargo) {
      case 1:
        return "Administrador";
      case 2:
        return "Mesero";
      case 3:
        return "Cajero";
      default:
        return "Cliente";
    }
  };

  const parseDate = (date) => {
    const theDate = new Date(Date.parse(date));
    const month = theDate.getMonth() + 1;
    const day = theDate.getDate();
    const year = theDate.getFullYear();
    return `${day}/${month}/${year}`;
  };
  console.log(user);
  // const users = user.data.filter((user) => user.cargo !== 4);
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer>
          <Alert />
          <AddUser />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Tipo de identificacion</TableCell>
                <TableCell>Identificacion</TableCell>
                <TableCell>Edad</TableCell>
                <TableCell>Cargo</TableCell>
                <TableCell>Sueldo</TableCell>
                <TableCell>Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.map((u) => (
                <TableRow key={u.idusuario}>
                  <TableCell>{u.nombre}</TableCell>
                  <TableCell>
                    {switchTipoIdentificacion(u.tipo_identificacion)}
                  </TableCell>
                  <TableCell>{u.identificacion} </TableCell>
                  <TableCell>{parseDate(u.fecha_nacimiento)} </TableCell>
                  <TableCell>{switchCargo(u.cargo)} </TableCell>
                  <TableCell>{u.sueldo} </TableCell>
                  <TableCell style={{ display: "flex" }}>
                    <EditUsers user={u} />
                    <DeleteUsers id={u.idusuario} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
