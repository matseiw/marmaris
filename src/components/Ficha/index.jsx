import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateFicha } from "actions/ficha_tecnica";
import { Calcular } from "components/Ficha/Calular";

const Ficha = ({ res = [], updateFicha }) => {
  const getMedida = (unidad) => {
    switch (unidad) {
      case 1:
        return "Unidades";
      case 2:
        return "Gramos";
      case 3:
        return "Litros";
      case 4:
        return "Kilos";
      default:
        return "CC";
    }
  };

  const [fichas, setFicha] = useState(res);

  useEffect(() => {
    setFicha(res);
  }, [res]);

  const onChange = ({ target }, idingrediente, unidad) => {
    console.log(idingrediente, unidad);
    setFicha((fichas) =>
      fichas.map((ficha) =>
        ficha.idingredientes === idingrediente && ficha.unidad_medida === unidad
          ? { ...ficha, [target.name]: target.value, changed: true }
          : ficha
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFicha(fichas.filter((ficha) => ficha.changed));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button
        variant="outlined"
        color="primary"
        type="submit"
        style={{ width: "100%", marginTop: "20px" }}
      >
        Modificar
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>Unidad de medida</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fichas.map((ficha) => (
            <TableRow>
              <TableCell>{ficha.nombre}</TableCell>
              <TableCell>{ficha.cantidad}</TableCell>
              <TableCell>{getMedida(ficha.unidad_medida)}</TableCell>
              <TableCell>
                <TextField
                  value={ficha.valor}
                  name="valor"
                  type="number"
                  onChange={(e) =>
                    onChange(e, ficha.idingredientes, ficha.unidad_medida)
                  }
                ></TextField>
              </TableCell>
              <TableCell>
                <Calcular
                  onChange={onChange}
                  idingredientes={ficha.idingredientes}
                  medida={ficha.unidad_medida}
                />{" "}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </form>
  );
};

const mapDispatchToProps = {
  updateFicha,
};

export default connect(null, mapDispatchToProps)(Ficha);
